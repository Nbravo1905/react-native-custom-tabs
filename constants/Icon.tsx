import { Feather } from "@expo/vector-icons";

export const icon: { [key: string]: (props: any) => JSX.Element } = {
  index: (props: any) => <Feather name='home' size={24} {...props} />,
  explore: (props: any) => <Feather name='compass' size={24} {...props} />,
  profile: (props: any) => <Feather name='user' size={24} {...props} />,
}