import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const GoogleIcon = (props: SvgProps) => {

  const {
    width = 21,
    height = 20,
  } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      {...props}
    >
      <Path
        fill="#4285F4"
        d="M20.1 10.227c0-.709-.064-1.39-.182-2.045H10.5v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35Z"
      />
      <Path
        fill="#34A853"
        d="M10.5 20c2.7 0 4.964-.895 6.618-2.423l-3.231-2.509c-.896.6-2.042.955-3.387.955-2.604 0-4.809-1.76-5.595-4.123H1.564v2.59A9.996 9.996 0 0 0 10.5 20Z"
      />
      <Path
        fill="#FBBC04"
        d="M4.904 11.9c-.2-.6-.313-1.24-.313-1.9 0-.66.114-1.3.313-1.9V5.51h-3.34A9.997 9.997 0 0 0 .5 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59Z"
      />
      <Path
        fill="#E94235"
        d="M10.5 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.869C15.459.991 13.196 0 10.501 0 6.59 0 3.208 2.24 1.563 5.51l3.34 2.59c.787-2.364 2.992-4.123 5.596-4.123Z"
      />
    </Svg>
  )
}

export default GoogleIcon
