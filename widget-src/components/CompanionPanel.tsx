const { widget } = figma
const { AutoLayout, SVG, Text, usePropertyMenu, useSyncedState } = widget

import ProgressBar from '../shared/ProgressBar'
import { ChecklistItemType } from '../types'
import { dropShadowEffect } from '../effects/dropShadows'
import ReviewSection from './ReviewSection'

interface ChecklistSectionType {
  title: string
  link: string
  items: ChecklistItemType[]
}

/**
 * Defines the props for the Checklist component.
 *
 * @interface ChecklistProps
 * @property {string} title - The title of the checklist.
 * @property {string} sections - The sections to display in the checklist.
 * @property {Record<string, boolean>} taskCompletion - The completion status of each task.
 * @property {(taskId: string, isChecked: boolean) => void} handleCheckChange - A function to handle changes to task completion.
 * @property {number} total - The total number of tasks.
 * @property {number} completed - The number of completed tasks.
 * @property {boolean} isDarkMode - Indicates whether the component is in dark mode.
 */
interface ChecklistProps {
  title: string
  sections: ChecklistSectionType[]
  taskCompletion: Record<string, boolean>
  handleCheckChange: (taskId: string, isChecked: boolean) => void
  total: number
  completed: number
  isDarkMode?: boolean | undefined
}

/**
 * Renders the Checklist component, which displays a list of categories and their associated tasks.
 *
 * @param {ChecklistProps} props - The props for the Checklist component.
 * @param {string} props.title - The title of the checklist.
 * @param {string} props.sections - The sections to display in the checklist.
 * @param {Record<string, boolean>} props.taskCompletion - The completion status of each task.
 * @param {(taskId: string, isChecked: boolean) => void} props.handleCheckChange - A function to handle changes to task completion.
 * @param {number} props.total - The total number of tasks.
 * @param {number} props.completed - The number of completed tasks.
 * @param {boolean} props.isDarkMode - Indicates whether the component is in dark mode.
 * @returns {JSX.Element} The rendered Checklist component.
 */
function CompanionPanel({
  title,
  sections,
  taskCompletion,
  handleCheckChange,
  total,
  completed,
  isDarkMode,
}: ChecklistProps) {
  const parentWidth = 460 // assuming a fixed width for the parent container
  const progressText = `${completed} of ${total} accessibility checks done`

  // Add tooltips toggle state
  const [tooltipsEnabled, setTooltipsEnabled] = useSyncedState(
    'tooltipsEnabled',
    false
  )

  usePropertyMenu(
    [
      {
        itemType: 'toggle',
        propertyName: 'show-tooltips',
        tooltip: 'Show tooltips on checkable items',
        isToggled: tooltipsEnabled,
      },
    ],
    ({ propertyName }) => {
      if (propertyName === 'show-tooltips') {
        setTooltipsEnabled(!tooltipsEnabled)
      }
    }
  )

  /**
   * Returns the main Checklist component, which displays a list of categories and their associated tasks.
   *
   * @returns {JSX.Element} The rendered Checklist component.
   */
  return (
    <AutoLayout
      direction="vertical"
      width={520}
      cornerRadius={8}
      effect={dropShadowEffect}
      fill={isDarkMode ? '#222222' : '#fff'}
      stroke="#212A6A"
      strokeAlign="outside"
      strokeWidth={1}
      spacing={30}
      padding={{ top: 0, bottom: 30, left: 0, right: 0 }}>
      {/* Header */}
      <AutoLayout
        name="Header"
        direction="horizontal"
        width="fill-parent"
        height={100}
        fill="#212A6A"
        verticalAlignItems="center"
        spacing={14}
        padding={{ top: 20, bottom: 20, left: 25, right: 0 }}>
        <SVG
          name="a11y-logo"
          width={51}
          height={51}
          src="<svg class='c-logo__icon' aria-hidden='true' focusable='false' width='51' height='51' xmlns='http://www.w3.org/2000/svg'><title>The A11Y Project</title><path d='M25.5 0C11.417 0 0 11.417 0 25.5S11.417 51 25.5 51 51 39.583 51 25.5 39.583 0 25.5 0zm-.385 5.064a3.3 3.3 0 0 1 3.307 3.291 3.304 3.304 0 0 1-3.307 3.306 3.3 3.3 0 0 1-3.29-3.306 3.29 3.29 0 0 1 3.29-3.291zm14.289 10.652l-9.809 1.24.005 9.817 4.755 15.867a1.85 1.85 0 0 1-1.344 2.252c-.989.25-2.003-.3-2.252-1.298l-4.87-14.443h-1.498l-4.48 14.742c-.374.964-1.448 1.404-2.407 1.03-.954-.37-1.533-1.454-1.158-2.418l4.115-15.572v-9.978l-9.04-1.228c-.928-.075-1.558-.89-1.483-1.818.07-.934.914-1.628 1.838-1.554l10.982.944h4.815l11.69-.963a1.68 1.68 0 0 1 1.749 1.623c.04.924-.68 1.718-1.608 1.758z' fill='#fff'></path></svg>"
        />
        <Text
          name="HeaderTitle"
          fill="#fff"
          fontFamily="Anaheim"
          fontSize={28}
          fontWeight={600}
          lineHeight="150%">
          {title}
        </Text>
      </AutoLayout>
      {/* Main content */}
      <AutoLayout
        name="Checklist"
        direction="vertical"
        spacing={16}
        width={520}
        padding={{ left: 30, right: 30 }}>
        <ProgressBar
          total={total}
          completed={completed}
          parentWidth={parentWidth}
        />
        <Text
          name="ProgressText"
          fill="#212A6A"
          lineHeight="100%"
          fontFamily="Anaheim"
          fontSize={18}
          fontWeight={600}>
          {progressText}
        </Text>
        {sections.map((section) => (
          <ReviewSection
            key={section.title}
            section={section}
            taskCompletion={taskCompletion}
            handleCheckChange={handleCheckChange}
            tooltipsEnabled={tooltipsEnabled}
          />
        ))}
      </AutoLayout>
    </AutoLayout>
  )
}

export default CompanionPanel
