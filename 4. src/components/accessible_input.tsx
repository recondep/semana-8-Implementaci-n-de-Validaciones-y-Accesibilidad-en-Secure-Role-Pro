// Implementación del Literal D: Feedback accesible (Iconos + Texto)
export const AccessibleInput = ({ label, error, ...props }: any) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text>{label}</Text>
      <TextInput 
        {...props} 
        style={{ borderColor: error ? 'red' : 'gray', borderWidth: 1 }} 
      />
      {error && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="warning" size={16} color="#D32F2F" /> {/* Icono para daltonismo */}
          <Text style={{ color: '#D32F2F', marginLeft: 5 }}>{error}</Text>
        </View>
      )}
    </View>
  );
};
