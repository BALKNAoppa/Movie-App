import { Film, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 flex justify-center gap-12 bg-indigo-700">
      <div className="flex flex-col items-start gap-[28px] flex-[1_0_0]">
        <div className="flex flex-col items-start gap-10 self-stretch">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-[#FAFAFA]">
              <Film className="w-5 h-5" />
              <h4 className="font-bold italic">Movie Z</h4>
            </div>
            <p className="text-[#FAFAFA] text-sm font-inter font-normal leading-5">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-[48px] self-stretch text-[#FAFAFA]">
          <div className="flex flex-col items-start gap-3">
            <p className="flex flex-col items-start gap-3 flex-[1_0_0] self-stretch text-[#FAFAFA] text-sm font-inter font-normal leading-5">
              Contact Information
            </p>
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-3">
                <div>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <p>Email:</p>
                  <p>support@movieZ.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <p>Phone:</p>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 flex-[1_0_0]">
            <p className="text-[#FAFAFA] text-sm font-inter font-normal leading-5">
              Follow us
            </p>
            <div className="flex flex-col justify-center items-start gap-3">
              <p className="text-[#FAFAFA] text-sm font-inter font-medium leading-5">Facebook</p>
              <p className="text-[#FAFAFA] text-sm font-inter font-medium leading-5">Instagram</p>
              <p className="text-[#FAFAFA] text-sm font-inter font-medium leading-5">Twitter</p>
              <p className="text-[#FAFAFA] text-sm font-inter font-medium leading-5">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;


