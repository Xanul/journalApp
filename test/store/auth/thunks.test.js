import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesOnLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers');

describe('Pruebas en auth thunks', () => {

  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('Debe de invocar el checkingCredentials', async () => {

    await checkingAuthentication()( dispatch );
    expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
    
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {

    const loginData = { ok: true, ...demoUser }
    await signInWithGoogle.mockResolvedValue( loginData );
    //thunk
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login(loginData) );

  });

  test('startGoogleSignIn debe de llamar checkingCredentials y logout - error', async () => {

    const loginData = { ok: false, errorMessage: 'Error en el login de google' }
    await signInWithGoogle.mockResolvedValue( loginData );
    //thunk
    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );

  });

  test('startLoginWithEmailPassword debe de llamar checkingCredentials y login', async () => {

    const loginData = {ok: true, ...demoUser};
    const {uid, displayName, email, photoURL} = loginData
    const formData = { email: demoUser.email, password: 'ABC123' };

    await loginWithEmailPassword.mockResolvedValue( loginData );

    await startLoginWithEmailPassword(formData)(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login({uid, displayName, email, photoURL}));

  });

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {

    await startLogout()(dispatch);
    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( clearNotesOnLogout )

  })

})