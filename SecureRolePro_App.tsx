import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  ScrollView, ActivityIndicator, StyleSheet, Alert 
} from 'react-native';
import { z } from 'zod'; // Librería de validación

// ==========================================
// LITERAL C: ESQUEMA DE VALIDACIÓN (ZOD)
// ==========================================
const registerSchema = z.object({
  fullName: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("Formato de correo inválido"),
  password: z.string().min(8, "La contraseña requiere 8+ caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export default function SecureRolePro() {
  const [step, setStep] = useState(1); // Control de Onboarding (Literal A)
  const [loading, setLoading] = useState(false); // Debounce Spinner (Literal C)
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // ==========================================
  // LITERAL C: VALIDACIÓN ASÍNCRONA (DEBOUNCE)
  // ==========================================
  useEffect(() => {
    if (form.email.length > 5) {
      setLoading(true);
      const delay = setTimeout(() => {
        setLoading(false); // Simulación de verificación en BD
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [form.email]);

  const handleRegister = () => {
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      // LITERAL D: Foco/Alerta en error
      Alert.alert("Error de Registro", "Por favor revisa los campos marcados.");
    } else {
      Alert.alert("Éxito", "Cuenta creada en Secure Role Pro");
    }
  };

  // ==========================================
  // LITERAL A: FLUJO DE ONBOARDING
  // ==========================================
  if (step < 3) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>🛡️ Secure Role Pro</Text>
        <Text style={styles.title}>
          {step === 1 ? "Bienvenido Doctor(a)" : "Control Total de Roles"}
        </Text>
        <Text style={styles.desc}>
          {step === 1 
            ? "Gestione sus accesos hospitalarios de forma segura." 
            : "Asigne permisos temporales y monitoree su seguridad."}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => setStep(step + 1)}>
          <Text style={styles.btnText}>Siguiente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setStep(3)}>
          <Text style={styles.link}>Saltar Onboarding</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ==========================================
  // LITERAL B y D: REGISTRO Y FEEDBACK ACCESIBLE
  // ==========================================
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. Dr. Luis García"
          onChangeText={(val) => setForm({...form, fullName: val})}
        />
        {errors.fullName && <Text style={styles.errorLabel}>⚠️ {errors.fullName._errors[0]}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo Institucional</Text>
        <View style={styles.row}>
          <TextInput 
            style={[styles.input, {flex: 1}]} 
            keyboardType="email-address" // Configuración de teclado (Literal B)
            placeholder="correo@hospital.com"
            onChangeText={(val) => setForm({...form, email: val})}
          />
          {loading && <ActivityIndicator size="small" color="#2ecc71" />}
        </View>
        {errors.email && <Text style={styles.errorLabel}>⚠️ {errors.email._errors[0]}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          onChangeText={(val) => setForm({...form, password: val})}
        />
        {errors.password && <Text style={styles.errorLabel}>⚠️ {errors.password._errors[0]}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          onChangeText={(val) => setForm({...form, confirmPassword: val})}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorLabel}>⚠️ {errors.confirmPassword._errors[0]}</Text>
        )}
      </View>

      <TouchableOpacity style={[styles.btn, {backgroundColor: '#2ecc71'}]} onPress={handleRegister}>
        <Text style={styles.btnText}>Finalizar Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#f9f9f9' },
  logo: { fontSize: 40, textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' },
  desc: { textAlign: 'center', marginVertical: 15, color: '#7f8c8d' },
  inputGroup: { marginBottom: 20 },
  label: { fontWeight: '600', marginBottom: 5 },
  input: { borderBottomWidth: 1, borderColor: '#bdc3c7', padding: 10, fontSize: 16 },
  errorLabel: { color: '#e74c3c', fontSize: 12, marginTop: 5, fontWeight: 'bold' }, // Feedback accesible
  btn: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  link: { textAlign: 'center', marginTop: 15, color: '#3498db' },
  row: { flexDirection: 'row', alignItems: 'center' }
});
