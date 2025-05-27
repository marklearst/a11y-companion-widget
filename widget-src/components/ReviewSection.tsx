const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG } = widget

// Get current user ONCE at module scope
const user = figma.currentUser

import { ChecklistItemType } from '../types'
import ReviewItem from './ReviewItem'
import ProgressTracker from '../shared/ProgressTracker'
import AvatarStack from '../shared/AvatarStack'

/**
 * Defines the props for the `ReviewSection` component.
 *
 * @interface ReviewSectionProps
 * @property {object} section - The section data.
 * @property {string} section.title - The title of the section.
 * @property {string} section.link - The link associated with the section.
 * @property {any[]} section.items - The items in the section.
 * @property {Record<string, boolean>} taskCompletion - The completion status of tasks.
 * @property {(taskId: string, isChecked: boolean) => void} handleCheckChange - A function to handle task completion changes.
 * @property {boolean} tooltipsEnabled - Whether tooltips are enabled for the section.
 */
interface ReviewSectionProps {
  section: {
    title: string
    description?: string
    items: ChecklistItemType[]
  }
  taskCompletion: Record<string, boolean>
  handleCheckChange: (taskId: string, isChecked: boolean) => void
  tooltipsEnabled: boolean
}

/**
 * Renders a section component that displays a list of items.
 *
 * @param {ReviewSectionProps} props - The props for the ReviewSection component.
 * @param {object} props.section - The section data.
 * @param {string} props.section.title - The title of the section.
 * @param {string} props.section.link - The link associated with the section.
 * @param {any[]} props.section.items - The items in the section.
 * @param {Record<string, boolean>} props.taskCompletion - The completion status of tasks.
 * @param {(taskId: string, isChecked: boolean) => void} props.handleCheckChange - A function to handle task completion changes.
 * @param {boolean} props.tooltipsEnabled - Whether tooltips are enabled for the section.
 * @returns {JSX.Element} The rendered ReviewSection component.
 */
function ReviewSection({
  section,
  taskCompletion,
  handleCheckChange,
  tooltipsEnabled,
}: ReviewSectionProps) {
  if (!section || !Array.isArray(section.items)) {
    return null
  }

  // Use section title as key for open/closed state
  const [openSections, setOpenSections] = useSyncedState<
    Record<string, boolean>
  >('openSections', {})
  const isOpen = openSections[section.title] || false

  // Collaborative avatars per section
  const [sectionAvatars, setSectionAvatars] = useSyncedState<
    Record<string, { id: string; name: string; photoUrl: string | null }[]>
  >('sectionAvatars', {})

  // Calculate per-section progress
  const total = section.items.length
  const completed = section.items.filter(
    (item) => taskCompletion[item.id]
  ).length

  // Caret SVG (right when closed, down when open)
  const caretSvgSrcClosed =
    "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5 3L11 8L5 13' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
  const caretSvgSrcOpen =
    "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3 5L8 11L13 5' stroke='#9299CE' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"

  // Toggle open/closed state for this section
  const toggleSection = () => {
    setOpenSections({
      ...openSections,
      [section.title]: !isOpen,
    })
  }

  // Enhanced handleCheckChange to update avatars
  const handleCheckChangeWithAvatars = (taskId: string, isChecked: boolean) => {
    handleCheckChange(taskId, isChecked)
    if (!user || typeof user.id !== 'string' || user.id === null) return
    // Only update if checking (not unchecking)
    if (isChecked) {
      setSectionAvatars((prev) => {
        const avatars = prev[section.title] || []
        // Remove if already present and filter out any with id not a string
        const filtered = avatars.filter(
          (a) => typeof a.id === 'string' && a.id !== user.id
        )
        // Add to front
        const updated: { id: string; name: string; photoUrl: string | null }[] =
          [
            { id: user.id as string, name: user.name, photoUrl: user.photoUrl },
            ...filtered,
          ]
        return {
          ...prev,
          [section.title]: updated,
        }
      })
    }
  }

  const avatars = sectionAvatars[section.title] || []

  /**
   * Renders the ReviewSection component, which displays a list of items.
   *
   * @returns {JSX.Element} The rendered ReviewSection component.
   */
  return (
    <AutoLayout
      name="Section"
      direction="vertical"
      spacing={8}
      width="fill-parent">
      <AutoLayout
        padding={{ top: 10, bottom: 10 }}
        spacing={12}
        verticalAlignItems="center"
        width="fill-parent"
        onClick={toggleSection}
        height={34}
        horizontalAlignItems="center">
        <SVG
          name="Caret"
          width={16}
          height={16}
          src={isOpen ? caretSvgSrcOpen : caretSvgSrcClosed}
        />
        <Text
          name="SectionTitle"
          fill="#212A6A"
          fontFamily="Anaheim"
          fontSize={20}
          fontWeight={700}
          lineHeight="150%">
          {section.title}
        </Text>
        <AutoLayout width="fill-parent" />
        <AutoLayout
          direction="horizontal"
          spacing={8}
          verticalAlignItems="center">
          <AvatarStack
            avatars={avatars}
            size={34}
            maxAvatars={5}
          />
          <ProgressTracker
            completed={completed}
            total={total}
          />
        </AutoLayout>
      </AutoLayout>
      {isOpen && section.description && (
        <AutoLayout
          fill="#F3F4FC"
          padding={{ vertical: 14, horizontal: 20 }}
          cornerRadius={16}
          width="fill-parent"
          verticalAlignItems="center">
          <Text
            name="SectionDescription"
            fill="#212A6A"
            opacity={0.7}
            fontFamily="Anaheim"
            fontSize={14}
            fontWeight={600}
            lineHeight="150%"
            width="fill-parent">
            {section.description}
          </Text>
        </AutoLayout>
      )}
      {isOpen &&
        section.items.map((item) => (
          <ReviewItem
            key={item.id}
            item={item}
            checked={taskCompletion[item.id]}
            onCheckChange={(taskId, isChecked) =>
              handleCheckChangeWithAvatars(taskId, isChecked)
            }
            tooltipsEnabled={tooltipsEnabled}
          />
        ))}
    </AutoLayout>
  )
}

export default ReviewSection
