import { ForgotPasswordPage } from './src/pages/ForgotPasswordPage';
import { LoginPage } from './src/pages/LoginPage';
import { SignUpPage } from './src/pages/SignUpPage';
import { InventoryPage } from './src/pages/InventoryPage';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';

export default function App(): JSX.Element {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" enabled>

          <InventoryPage/>
          
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
