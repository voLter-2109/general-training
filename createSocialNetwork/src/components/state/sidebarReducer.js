let initialState = {
  friends: [
    {
      name: "Ivan",
      id: 1,
      url: "https://img.freepik.com/premium-psd/3d-illustration-smiling-mature-man-cartoon-close-up-portrait-standing-gray-hair-man-blue-background-3d-avatar-ui-ux_1020-5075.jpg?w=2000",
    },
    {
      name: "Kost",
      id: 2,
      url: "https://img.freepik.com/premium-psd/3d-illustration-smiling-caucasian-man-cartoon-close-up-portrait-standing-caucasian-man-with-moustache-yellow-background-3d-avatar-ui-ux_1020-5070.jpg",
    },
    {
      name: "Ros",
      id: 3,
      url: "https://img.freepik.com/premium-psd/3d-illustration-3d-cartoon-avatar-stylish-old-man-with-mustache-cartoon-close-up-portrait-gray-background-3d-avatar-ui-ux_1020-5088.jpg?w=360",
    },
  ],
};

const sidebarReducer = (state = initialState, action) => {
  return state;
};

export default sidebarReducer;
