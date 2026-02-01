// Implementación del Literal A: Flujo de Bienvenida
export const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/logo_pro.png')} />
      <Text style={{ fontSize: 24 }}>Bienvenido a Secure Role Pro</Text>
      <Text>Seguridad de nivel médico para tus accesos.</Text>
      
      <Button title="Siguiente" onPress={() => navigation.navigate('BenefitScreen')} />
      <Button title="Saltar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};
