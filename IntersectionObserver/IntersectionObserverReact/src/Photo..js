
import { useInView } from "react-intersection-observer";


const Photo = (props) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });



  return (
    <div className="photo-card" ref={ref} >
      {inView ? (
        <img src={props.imageUrl} alt="" />
      ) : (
        <div className="photo-card_sceleton"></div>
      )}

      <h1>{props.name}</h1>
    </div>
  );
};

export default Photo;
