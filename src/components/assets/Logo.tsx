import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width={322}
      height={372}
      viewBox="0 0 322 372"
      fill="none"
      {...props}
    >
      <Path
        d="M4.21 192.694L51.878 31.506h108.065l-28.255 96.258 54.188 16.903-25.933 98.959L4.21 192.694zM136.937 371.563l84.968-334.904h99.569l-79.061 334.904H136.937z"
        fill="#FF5C00"
      />
      <Path
        d="M4.458 192.765l127.416-64.974 54.004 16.876-26.159 98.726L4.458 192.765zM277.009 224.83l-82.693-79.319-57.379 226.142h105.476l34.596-146.823z"
        fill="#D64D00"
      />
    </Svg>
  )
}

export default SvgComponent
