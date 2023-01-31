import type { NextComponentType } from "next";

import {
  AiOutlineGithub,
  AiOutlineTwitter,
  FaLinkedinIn,
  BsInstagram
} from "../Misc/Icons.collection";

import { Icon } from "../Misc/Icon.component";

const Contact: NextComponentType = () => {
  return (
    <div className="px-3 font-sen" id="contact">
      <p className="text-3xl font-bold text-white">Get in touch</p>

      <div className="my-8 flex flex-row justify-center gap-x-4">
        <Icon icon={<AiOutlineGithub />} url="https://github.com/theabgarg" />

        <Icon
          icon={<AiOutlineTwitter />}
          url="https://twitter.com/theabgarg"
        />
        <Icon
          icon={<FaLinkedinIn />}
          url="https://www.linkedin.com/in/theabgarg/"
        />
        <Icon
          icon={<BsInstagram />}
          url="https://www.instagram.com/theabgarg/"
        />
      </div>
    </div>
  );
};

export default Contact;
