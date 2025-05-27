const { widget } = figma
const { AutoLayout, SVG } = widget

/**
 * Defines the props for the Checkbox component.
 * @property {boolean} checked - Indicates whether the checkbox is checked or not.
 */
interface CheckboxProps {
  checked: boolean
}

/**
 * Renders a checkbox with an optional checkmark.
 *
 * @param {CheckboxProps} props - The props for the Checkbox component.
 * @param {boolean} props.checked - Indicates whether the checkbox is checked or not.
 * @returns {JSX.Element} The rendered Checkbox component.
 */
const Checkbox = ({ checked }: CheckboxProps) => (
  <AutoLayout
    name="Checkbox"
    fill={checked ? '#212a6a' : '#fff'}
    stroke="#212a6a"
    strokeWidth={2}
    cornerRadius={6}
    overflow="visible"
    width={24}
    height={24}
    verticalAlignItems="center"
    horizontalAlignItems="center">
    {checked && (
      <SVG
        name="checkmark"
        x={{
          type: 'center',
          offset: -0.083,
        }}
        y={{
          type: 'center',
          offset: 0.5,
        }}
        src="<svg width='16' height='20' viewBox='-2.5 -2 15 12' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9.83333 0L2.83333 6.99967L0 4.16666' stroke='#ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"
      />
    )}
  </AutoLayout>
)

export default Checkbox
