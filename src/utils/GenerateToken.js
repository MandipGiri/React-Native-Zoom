import {Keys} from '../config/Keys';
import jwt from 'react-native-pure-jwt';

export async function generateToken() {
  try {
    let jwtToken = await jwt.sign(
      {
        iss: Keys.API_KEY,
        exp: new Date().getTime() + 10000 * 90, // expire in 90 min
      },
      Keys.API_SECRET,
      {
        alg: 'HS256',
      },
    );
    return jwtToken;
  } catch (error) {
    console.error(`JWT:${error}`);
  }
}
