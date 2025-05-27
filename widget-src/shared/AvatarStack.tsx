const { widget } = figma
const { AutoLayout, Image, Text } = widget

interface Avatar {
  id: string
  name: string
  photoUrl: string | null
}

interface AvatarStackProps {
  avatars: Avatar[]
  size?: number // default 34
  maxAvatars?: number // default 5
}

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
