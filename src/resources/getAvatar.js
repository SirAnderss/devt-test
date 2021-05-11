const avatar = name =>
  `https://ui-avatars.com/api/?name=${name.split(' ')[0]}+${
    name.split(' ')[1]
  }`;

export default avatar;
