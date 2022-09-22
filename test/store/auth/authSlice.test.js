import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {

  test('Debe de regresar el estado inicial y llamarse auth', () => {

    const state = authSlice.reducer( initialState, {} );

    expect(authSlice.name).toBe('auth');     
    expect( state ).toEqual( initialState );

  })

  test('Debe de realizar la autenticacion', () => {

    const state = authSlice.reducer(initialState, login(demoUser));
    expect( state ).toEqual({
      status: 'authenticated', //'checking', 'not-authenticated', 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    })

  });

  test('Debe de realizar el logout sin argumentos', () => {

    //authenticatedState de inicio debe devolver en estado del logout
    const logoutState = authSlice.reducer(authenticatedState, logout());
    expect( logoutState ).toEqual({
      status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    })

  })

  test('Debe de realizar el logout y mostrar un mensaje de error', () => {

    //authenticatedState de inicio debe devolver en estado del logout con argumentos
    const errorMessage = 'Credenciales no son correctas';  
    const logoutState = authSlice.reducer(authenticatedState, logout({ errorMessage }));
    
    expect( logoutState ).toEqual({
      status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage
    })


  })

  test('Debe de cambiar el estado a checking', () => {

    const state = authSlice.reducer(authenticatedState, checkingCredentials())
    expect( state.status ).toBe('checking');

  })

})