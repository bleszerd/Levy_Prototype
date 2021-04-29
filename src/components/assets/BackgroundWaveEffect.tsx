import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={1081}
      height={1449}
      viewBox="0 0 1081 1449"
      fill="none"
      {...props}
    >
      <Path
        d="M499 431.5C816.2 513.9 1020.5 178.667 1081 0v1449H0l1-764c34.333-118.833 180.8-335.9 498-253.5z"
        fill="#FF5C00"
      />
    </Svg>
  )
}

export default SvgComponent
