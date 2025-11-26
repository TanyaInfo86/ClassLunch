import roboto from "../../public/fonts/Roboto-Regular.ttf";

export const loadRoboto = async () => {
  const font = await fetch(roboto).then(r => r.arrayBuffer());
  return font;
};
