const { widget } = figma
const { AutoLayout, Image, Text } = widget

/**
 * Represents a user avatar for display in a stack.
 *
 * @remarks
 * Used in the AvatarStack component to visually represent users or reviewers.
 */
interface Avatar {
  /** Unique identifier for the avatar. */
  id: string
  /** Display name for the avatar. */
  name: string
  /** Optional photo URL for the avatar image. */
  photoUrl: string | null
}

/**
 * Props for the AvatarStack component.
 *
 * @remarks
 * Controls the avatars, size, and maximum shown avatars in the stack.
 */
interface AvatarStackProps {
  /** Array of avatars to display. */
  avatars: Avatar[]
  /** Size of each avatar in pixels. @defaultValue 34 */
  size?: number
  /** Maximum number of avatars to display. @defaultValue 5 */
  maxAvatars?: number
}

/**
 * Renders a horizontal stack of user avatars with overflow handling.
 *
 * @remarks
 * Displays up to a maximum number of avatars, with overflow shown as a "+N" indicator. Uses Figma Widget API primitives for layout and image rendering.
 *
 * @param avatars - The array of avatars to display.
 * @param size - The size of each avatar (optional).
 * @param maxAvatars - The maximum number of avatars to display (optional).
 * @returns The rendered AvatarStack component.
 *
 * @example
 * ```ts
 * <AvatarStack avatars={avatars} size={28} maxAvatars={5} />
 * ```
 *
 * @see {@link https://www.figma.com/widget-docs/api/api-reference/ | Figma Widget API Reference}
 */
const AvatarStack = ({
  avatars,
  size = 28,
  maxAvatars = 5,
}: AvatarStackProps) => {
  if (!avatars || avatars.length === 0) return null
  const shown = avatars.slice(0, maxAvatars).reverse()
  const extra = avatars.length - maxAvatars
  return (
    <AutoLayout
      direction="horizontal"
      spacing={-size / 4}
      verticalAlignItems="center"
      height={size}
      overflow="visible">
      {shown.map((avatar) =>
        avatar.photoUrl ? (
          <Image
            key={avatar.id}
            src={avatar.photoUrl}
            width={size}
            height={size}
            cornerRadius={size / 2}
            stroke="#fff"
            strokeWidth={1}
            strokeAlign="inside"
            tooltip={avatar.name}
          />
        ) : (
          <AutoLayout
            key={avatar.id}
            width={size}
            height={size}
            cornerRadius={size / 2}
            fill="#000"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            stroke="#fff"
            strokeWidth={1}
            strokeAlign="inside"
            tooltip={avatar.name}>
            <Text
              fill="#fff"
              fontSize={Math.round(size / 2.5)}
              fontWeight={700}>
              {avatar.name.charAt(0).toUpperCase()}
            </Text>
          </AutoLayout>
        )
      )}
      {extra > 0 && (
        <AutoLayout
          width={size}
          height={size}
          cornerRadius={size / 2}
          fill="#e0e0e0"
          horizontalAlignItems="center"
          verticalAlignItems="center"
          stroke="#fff"
          strokeWidth={1}
          strokeAlign="inside"
          tooltip={`${extra} more reviewers`}>
          <Text
            fill="#212A6A"
            fontSize={Math.round(size / 2.5)}
            fontWeight={700}>
            +{extra}
          </Text>
        </AutoLayout>
      )}
    </AutoLayout>
  )
}

export default AvatarStack
