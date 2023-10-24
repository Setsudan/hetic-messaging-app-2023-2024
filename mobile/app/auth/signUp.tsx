import { Layout, Text, Input, Button } from "@ui-kitten/components"
import { SignUpBody } from "../../types/API/auth.types"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Response } from "../../types/API/response.types"

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

    const validateSignUpBody = () => {
        const errors = []

        if (!emailRegex.test(signUpBody.email)) {
            errors.push("Invalid email")
        }

        if (!passwordRegex.test(signUpBody.password)) {
            errors.push("Invalid password")
        }

        if (signUpBody.password !== confirmPassword) {
            errors.push("Passwords do not match")
        }

        return errors
    }

    const handleSubmission = () => {
        console.log("Submitting sign up body")
        const errors = validateSignUpBody()
        console.log(errors)

        if (errors.length > 0) {
            setErrors(errors)
            return
        }

        // Submit the sign up body to the API
        console.log("everything is valid")
        const port = process.env.EXPO_PUBLIC_API_IP
        console.log(`${port}:8080/api/v1/auth/signUp`)
        fetch(`${port}:8080/api/v1/auth/signUp`,
            // is expecting json
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signUpBody),
            }
        ).then((response) => {
            console.log(response)
            return response.json()
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            console.log("finally")
        })


    }

    return (
        <Layout style={{ flex: 1, paddingHorizontal: 8 }}>
            {
                // if in dev environnement allow double tap on Sign Up text to fill in form
                __DEV__ ? <Text
                    onPress={() => {
                        setSignUpBody({
                            display_name: "Test User",
                            email: "test@gmail.com",
                            password: "Password1!",
                            username: "testuser",
                        })
                        setConfirmPassword("Password1!")
                    }}
                    style={{ textAlign: "center", color: "white" }}
                    category="h1"
                >
                    Sign Up
                </Text> : <Text category="h1"> Sign Up</Text>
            }
            <View style={{ flex: 1, margin: 16, borderRadius: 18 }}>
                <Text
                    style={styles.label}
                    category="label">
                    Username
                </Text>
                <Input
                    value={signUpBody.username}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, username: text })}
                />
                <Text
                    style={styles.label}
                    category="label">
                    Email
                </Text>
                <Input
                    value={signUpBody.email}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, email: text })}
                />
                <Text
                    style={styles.label}
                    category="label">
                    Display Name
                </Text>
                <Input
                    value={signUpBody.display_name}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, display_name: text })}
                />
                <Text
                    style={styles.label}
                    category="label">
                    Password
                </Text>
                <Input
                    value={signUpBody.password}
                    onChangeText={(text) => setSignUpBody({ ...signUpBody, password: text })}
                />
                <Text
                    style={styles.label}
                    category="label">
                    Confirm Password
                </Text>
                <Input
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>
            <View style={styles.errorWrapper}>
                {errors.map((error) => <Text
                    key={error}
                    style={styles.error}
                >{error}</Text>)}
            </View>
            <Button onPress={handleSubmission}>
                Sign Up
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    label: {
        color: "white",
        marginVertical: 8,
    },
    errorWrapper: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
    },
    error: {
        color: "red",
        marginVertical: 8,
    }
})
