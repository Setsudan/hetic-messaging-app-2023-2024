import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { SignUpBody } from "../../types/API/auth.types"
import { useState } from "react"
import { View } from "react-native"

const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');

export default function SignUpScreen() {

    const [signUpBody, setSignUpBody] = useState<SignUpBody>({
        display_name: "",
        email: "",
        password: "",
        username: "",
    })

    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [errors, setErrors] = useState<string[]>([])

    const handleSubmission = () => {
        if (!emailRegex.test(signUpBody.email)) {
            setErrors([...errors, "Invalid email"])
        }
        if (!passwordRegex.test(signUpBody.password)) {
            setErrors([...errors, "Invalid password"])
        }
        if (signUpBody.password !== confirmPassword) {
            setErrors([...errors, "Passwords do not match"])
        }

        if (errors.length > 0) {
            console.log('Signup body is invalid')
            console.log(signUpBody)
            console.log(errors)
            return
        }

        console.log('Signup body is valid')
        console.log(signUpBody)
    }

    return (
        <Layout style={{ flex: 1 }}>
            <Text category="h1" style={{ textAlign: "center", marginTop: 32 }}>
                Sign Up
            </Text>
            <View style={{ flex: 1, margin: 16, borderRadius: 18 }}>
                <Text category="label">
                    Username
                </Text>
                <Input
                    value={signUpBody.username}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, username: text })}
                />
                <Text category="label">
                    Email
                </Text>
                <Input
                    value={signUpBody.email}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, email: text })}
                />
                <Text category="label">
                    Display Name
                </Text>
                <Input
                    value={signUpBody.display_name}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, display_name: text })}
                />
                <Text category="label">
                    Password
                </Text>
                <Input
                    value={signUpBody.password}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, password: text })}
                />
                <Text category="label">
                    Comfirm Password
                </Text>
                <Input
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>
            <Text category="label" style={{ textAlign: "center", color: "red" }}>
                {errors.map((error) => <Text
                    key={error}
                >{error}</Text>)}
            </Text>
            <Button onPress={handleSubmission}>
                Sign Up
            </Button>
        </Layout>
    )
}