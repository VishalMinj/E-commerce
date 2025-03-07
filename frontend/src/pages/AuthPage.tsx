import { Form } from "../components";
import { calculateHeight } from "../utils/calculateHeight";

export const AuthPage = () => {
  return (
    <>
      <section
        className="w-[100%] flex justify-center items-baseline"
        style={{ minHeight: `calc(100vh - ${calculateHeight()}px)` }}
      >
        <Form />
      </section>
    </>
  );
};
