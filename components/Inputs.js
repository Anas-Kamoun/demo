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

export const SelectInput = ({
  value,
  setValue,
  options,

  placeholder,
}) => {
  return (
    <FormControl w="full">
      <Select
        selectedValue={value}
        _item={{
          bg: "transparent",
          _text: { fontSize: "sm", color: "indigo.700" },
          _pressed: { bg: "gray.100" },
        }}
        h="12"
        size={Platform.OS == "android" ? "md" : "lg"}
        onValueChange={(val) => setValue(val)}
        placeholder={placeholder}
        _selectedItem={{
          bg: "indigo.500",
          _text: { color: "white", fontSize: "sm" },
          endIcon: <CheckIcon color="white" size={5} />,
          _pressed: { bg: "indigo.400" },
        }}
        mt="2"
      >
        {options.map((option) => (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Select>
    </FormControl>
  );
};
