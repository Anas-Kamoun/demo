import { AntDesign } from "@expo/vector-icons";
import { Box, Button, Fab, Icon, IconButton, Link } from "native-base";

export const SolidButton = ({
  children,
  size,
  isLoading,
  isLoadingText,
  leftIcon,
  endIcon,
  onPress,
  disabled,
  bg,
  pressedBg,
  textColor,
  style,
}) => {
  // size : "xs", "sm", "md", "lg"
  // variant : "ghost","link","outline","solid","subtle","unstyled"
  // leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
  // endIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
  return (
    <Button
      style={{ ...style }}
      w="full"
      bg={disabled ? "light.300" : bg || "indigo.700"}
      _pressed={{ bg: pressedBg || "indigo.300" }}
      disabled={disabled || false}
      isLoading={isLoading || false}
      _loading={{ bg: "indigo.500", opacity: 1 }}
      isLoadingText={isLoadingText}
      size={size || "lg"}
      leftIcon={leftIcon || null}
      endIcon={endIcon || null}
      justifyContent="center"
      onPress={onPress}
      _text={{
        fontFamily: "body",
        fontWeight: 300,
        fontSize: 13,
        color: disabled ? "gray.400" : textColor || "white",
      }}
    >
      {children}
    </Button>
  );
};
export const OutlineButton = ({
  children,
  size,
  isLoading,
  isLoadingText,
  leftIcon,
  endIcon,
  onPress,
  disabled,
  colorText,
  borderColor,
  style,
}) => {
  // size : "xs", "sm", "md", "lg"
  // variant : "ghost","link","outline","solid","subtle","unstyled"
  // leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
  // endIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
  return (
    <Button
      style={{ ...style }}
      w="full"
      bg="gray.50"
      borderColor={borderColor || "indigo.700"}
      variant="outline"
      _pressed={{ bg: "gray.100" }}
      disabled={disabled || false}
      isLoading={isLoading || false}
      _loading={{ bg: "gray.50", opacity: 1 }}
      _spinner={{
        color: "indigo.700",
      }}
      isLoadingText={isLoadingText}
      size={size || "md"}
      leftIcon={leftIcon || null}
      endIcon={endIcon || null}
      justifyContent="center"
      onPress={onPress}
      _text={{
        fontFamily: "body",
        fontWeight: 300,
        fontSize: 12,
        color: colorText || "indigo.700",
      }}
    >
      {children}
    </Button>
  );
};
