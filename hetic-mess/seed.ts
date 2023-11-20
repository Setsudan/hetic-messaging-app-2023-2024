import { register, RegisterData } from './common/auth';
import { pb } from "./db/pocket";
const populate = async (props) => {
  const { username, name, password } = props;
  const data: RegisterData = {
    username,
    name,
    password,
    passwordConfirm: password,
    email: `${username}@gmail.com`,
    emailVisibility: false,
  };
  const res = await register(data);
};

export const seed = [
  {
    username: 'kdavana2c',
    name: 'Whitejacket',
    password: 'vF5=N(/u0s?MQBu',
  },
  {
    username: 'lgetcliff2d',
    name: 'Heartleaf Skullcap',
    password: 'dB5+kqA6&~P%g}m',
  },
  {
    username: 'mharborow2e',
    name: 'Common Cordgrass',
    password: 'nE3&<FrhFFTEwAI',
  },
  {
    username: 'bdillon2f',
    name: 'Spurgelaurel',
    password: 'hB9<W@<L*~?,A',
  },
  {
    username: 'spoli2g',
    name: 'Largespore Ulota Moss',
    password: 'kB5"vv`6A%',
  },
  {
    username: 'spenni2h',
    name: 'Yukon Fleabane',
    password: 'aL3/<LJ7qz',
  },
];