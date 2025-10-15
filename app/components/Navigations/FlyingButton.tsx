import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const FlyingButton = () => {
  return (
    <div>
      <a
        href="https://wa.me/+989196631457"
        className="btn btn-circle fixed bottom-30 bg-green-600 text-gray"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
    </div>
  );
};
export { FlyingButton };
