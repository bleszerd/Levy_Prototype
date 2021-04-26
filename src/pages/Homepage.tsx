import React from 'react'
import { Text, SafeAreaView, View } from "react-native";
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Homepage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 42,
            }}>
                <Text style={{ color: colors.white, fontSize: 24, fontFamily: fonts.title, textAlign: 'center'}}>
                    Obrigado por participar do Alpha 0.1T do Levy, Vinícius!  😍
                </Text>
                <Text style={{
                    position: 'absolute',
                    color: colors.plate, fontSize: 12, fontFamily: fonts.text, textAlign: 'center',
                    bottom: 26,
                }}>
                    © LEVY - Vinicius A. Resende Oliveira, São Paulo 14350-000.{'\n'}{'\n'}
                    Todos os direitos reservados a VINÍCIUS RESENDE em propriedade intelectual de FACEBOOK Inc.
                    {'\n'}{'\n'}
                    Acesse a distribuição de direitos em https://github.com/facebook/react-native/blob/master/LICENSE
                </Text>
            </View>
        </SafeAreaView>
    )
}