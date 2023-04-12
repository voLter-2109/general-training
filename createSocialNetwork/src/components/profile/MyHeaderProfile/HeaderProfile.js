// style
import Preloader from "../../common/Preloader/Preloader";
import s from "../Profile.module.scss";

const HeaderProfile = (props) => {
  if (!props.profile || props.profile === null) {
    return <Preloader />;
  }

  return (
    <div
      className={s.profileImg}
      style={{ backgroundImage: `url(${props.profile.fotoUrl.large})` }}
    >
      <div className={s.profileCard}>
        <div className={s.avatar}>
          <img src={props.profile.fotoUrl.small} alt="avatar" />
        </div>
        <div className={s.name}>{props.profile.name}</div>
      </div>
    </div>
  );
};

export default HeaderProfile;
