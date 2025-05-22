import { User } from '../types/users';
import { faker } from '@faker-js/faker';

const BASE_USERS: { name: string; email: string }[] = [
  { name: 'Ronald Espinoza', email: 'ronald.espinoza@cencosud.cl' },
  { name: 'Elías Zavala', email: 'elias.zavala@cencosud.cl' },
  { name: 'Sergio Rojas', email: 'sergio.rojas@cencosud.cl' },
  { name: 'Carlos Moreno', email: 'carlos.moreno@cencosud.cl' },
  { name: 'Khirons Quezada', email: 'khirons.quezada@cencosud.cl' },
  { name: 'Kembert Nieves', email: 'kembert.nieves@cencosud.cl' },
  { name: 'Álvaro Santana', email: 'alvaro.santana@cencosud.cl' },
  { name: 'Noeliz Romero', email: 'noeliz.romero@cencosud.cl' },
  { name: 'Francisca Choy', email: 'francisca.choy@cencosud.cl' },
  { name: 'Fabián Zambrano', email: 'fabian.zambrano@cencosud.cl' },
];

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => {
    const base =
      i < BASE_USERS.length
        ? BASE_USERS[i]
        : {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
          };

    return {
      id: String(i + 1).padStart(5, '0'),
      name: base.name,
      email: base.email,
      status: i % 2 === 0 ? true : false,
    };
  });
}
