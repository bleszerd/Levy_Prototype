import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

interface SvgButtonProps extends SvgProps {
  active?: boolean
}

function SvgComponent(props: SvgButtonProps) {
  return (
    <Svg
      width={181}
      height={181}
      viewBox="0 0 181 181"
      fill="none"
      {...props}
    >
      <Rect x={1} width={180} height={180} rx={90} fill="#1F1A2E" />
      <Rect x={17} y={16} width={147} height={147} rx={73.5} fill="#fff" />
      <Path
        d="M128.195 97.98h-30v30h-15v-30h-30v-15h30v-30h15v30h30v15zm-37.5-82.5a75 75 0 100 150 75 75 0 000-150z"
        fill="#FF5C00"
      />
    </Svg>
  )
}

export default SvgComponent
