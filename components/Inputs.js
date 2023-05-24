import { Feather } from "@expo/vector-icons";
import {
  Checkbox,
  CheckIcon,
  FormControl,
  Input,
  Radio,
  Select,
  Switch,
  Text,
  HStack,
  Box,
  TextArea,
  Icon,
} from "native-base";
import { Platform } from "react-native";

export const CheckBoxComponent = ({ value, setValue, children, size }) => {
  // size :"sm",md","lg"
  return (
    <Checkbox
      width={"100%"}
      size={size || "sm"}
      my="4"
      focusable={false}
      value={value}
      style={{ borderColor: "transparent" }}
      _text={{ fontSize: 13, flex: 1, color: "dark.100" }}
      _icon={{ color: "white" }}
      _checked={{ bg: "indigo.700" }}
      onChange={setValue}
    >
      {children}
    </Checkbox>
  );
};

export const InputText = ({
  value,
  setValue,
  isInvalid,
  isDisabled,
  placeholder,
  label,
  helper,
  keyboardType,
  secureTextEntry,
  InputLeftElement,
  InputRightElement,
  style,
  onSubmitEditing,
  reference,
}) => {
  // size xs,sm,md,lg,xl,2xl
  // keyboardType : default, phone-pad, number-pad
  return (
    <FormControl
      style={{ ...style }}
      isInvalid={isInvalid || false}
      bg="white"
      isDisabled={isDisabled || false}
    >
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        ref={reference || null}
        onSubmitEditing={onSubmitEditing || null}
        secureTextEntry={secureTextEntry || false}
        returnKeyType="next"
        autoComplete="off"
        InputLeftElement={InputLeftElement || null}
        InputRightElement={InputRightElement || null}
        value={value}
        onChangeText={(txt) => setValue(txt)}
        keyboardType={keyboardType || "default"}
        size={Platform.OS == "android" ? "md" : "lg"}
        h="12"
        fontWeight="400"
        color="muted.800"
        placeholder={placeholder}
        _focus={{ bg: "white", borderColor: "indigo.700" }}
      />
      {helper && <FormControl.HelperText>{helper}</FormControl.HelperText>}
    </FormControl>
  );
};

