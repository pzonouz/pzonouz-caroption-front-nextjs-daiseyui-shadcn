import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const TopBar = () => {
  return (
    <div className="p-2 flex items-center justify-between bg-gray-200">
      <div className="flex gap-3">
        <a
          href="https://www.instagram.com/carroption?igsh=MXdsZWkyaHA0em9mYw%3D%3D&utm_source=qr"
          className="text-rose-500"
        >
          <FontAwesomeIcon className="w-6" icon={faInstagram} />
        </a>
        <a href="https://wa.me/+989196631457" className="text-green-600">
          <FontAwesomeIcon className="w-6" icon={faWhatsapp} />
        </a>
      </div>
      <a href="tel:09196631457">۰۹۱۹۶۶۳۱۴۵۷</a>
    </div>
  );
};
export { TopBar };
