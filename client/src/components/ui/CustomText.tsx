import { Text, TextProps, TextStyle } from "react-native";

type FontWeight = "regular" | "bold";

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  weight?: FontWeight;
  style?: TextStyle | TextStyle[];
}

export default function CustomText({
  children,
  weight = "regular",
  style = {},
  ...props
}: CustomTextProps) {
  const fontFamily =
    weight === "bold" ? "AnonymousPro_700Bold" : "AnonymousPro_400Regular";

  return (
    <Text {...props} style={[{ fontFamily }, style]}>
      {children}
    </Text>
  );
}
