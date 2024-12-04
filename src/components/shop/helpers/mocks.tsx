import { CartItem } from "@/_common/interfaces/shop/CardProps";
import { Weapon } from "@/_common/interfaces/Weapon";

const cardMock: CartItem = {
    _id : "asdadw1219beu21as",
    min_lvl: 12,
    image: '/images/equipment/armors/jacket_1.png',
    modifiers: {
      intelligence: 12,
      dexterity: 12,
      constitution: 20,
      insanity: 43,
      charisma: 23,
      strength: 34
    },
    name: 'cardMock',
    description: 'Descripción prueba de carta lkasndjoasbdiuasd',
    value: 340,
    type: "weapon",
    isUnique: false,
    isActive: false,
    die_faces: 2,
    die_modifier: 1,
    die_num: 10,
    base_percentage: 12
  };

  const cartMock = [cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock];

  export default cartMock;