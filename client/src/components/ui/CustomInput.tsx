import { TextInput, View } from "react-native"
import type { IconType } from "./svg-icons";




const CustomInput = ({Icon,placeholder, value, onChangeText}: {Icon: IconType,placeholder: string, value: string, onChangeText: (text: string) => void}) => {

    return (
        <View className="overflow-hidden w-fit">
            <View className="flex-row items-center gap-x-4 border border-[#00000033] rounded-2xl py-3 px-5 bg-[#898A830D] w-fit">
                <Icon color="#00000066"/>
        
                <TextInput placeholder={placeholder} className="placeholder:text-[#00000066] text-xl w-full" style={{fontFamily:"AnonymousPro_700Bold"}} value={value} onChangeText={onChangeText}/>
            </View>
        </View>
    )
}

export default CustomInput;