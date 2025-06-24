const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG } = widget

// Get current user ONCE at module scope
const user = figma.currentUser

import { ChecklistSectionProps } from 'types/index'
import ProgressTracker from 'shared/ProgressTracker'
import AvatarStack from 'shared/AvatarStack'
import ChecklistItem from 'components/ChecklistItem'

/**
 * Renders a section of the accessibility checklist, displaying its items and completion state.
 *
 * @remarks
 * This component displays a group of checklist items, tracks their completion, and manages section-level UI state. Uses Figma Widget API primitives for layout and interactivity.
 *
 * @param section - The section data, including title, description, and items.
 * @param taskCompletion - Completion status of tasks in this section.
 * @param handleCheckChange - Handler for task completion changes.
 * @param tooltipsEnabled - Whether tooltips are enabled for the section.
 * @returns The rendered ChecklistSection component.
 *
 * @example
 * ```ts
 * <ChecklistSection
 *   section={section}
 *   taskCompletion={taskCompletion}
 *   handleCheckChange={handleCheckChange}
 *   tooltipsEnabled={true}
 * />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
function ChecklistSection({
  section,
  taskCompletion,
  handleCheckChange,
  tooltipsEnabled,
}: ChecklistSectionProps) {
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
   * Renders the ChecklistSection component, which displays a list of items.
   *
   * @returns {JSX.Element} The rendered ChecklistSection component.
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
          <ChecklistItem
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

export default ChecklistSection
