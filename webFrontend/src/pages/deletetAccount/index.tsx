import { useState } from "react";
import cn from "classnames";
import { useMutation } from "@tanstack/react-query";
import { deleteMember, postLogin, postLogout } from "@global/apis/func";
import localStorageFunc from "@global/utils/localStorage";
import { STORAGE_ACCESS_KEY } from "@global/constants";

const DeleteAccountPage = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isOpenCheckModal, setIsOpenCheckModal] = useState<boolean>(false);
  const [token, setToken] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({ accessToken: "", refreshToken: "" });
  const [nickname, setNickname] = useState<string>("");

  // 로그인
  const { mutate: loginMutate } = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken, nickName }) => {
      setToken({ accessToken, refreshToken });
      localStorageFunc.set(STORAGE_ACCESS_KEY, accessToken);
      setNickname(nickName);
      setIsOpenCheckModal(true);
    },
    onError: () => {
      alert(
        `이메일 또는 비밀번호를 확인해주세요. 계정 찾지 못할 시 저희에게 문의해주세요\ngazinowcs@gmail.com`
      );
    },
  });

  // 로그아웃
  const { mutate: logoutMutate } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setIsOpenCheckModal(false);
      setForm({ email: "", password: "" });
    },
  });

  // 회원탈퇴
  const { mutate: deleteMemberMutate } = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      setIsOpenCheckModal(false);
      setForm({ email: "", password: "" });
      alert(
        `${nickname}님, 저희 서비스를 탈퇴하시는 것은 정말 아쉽습니다.\n하지만, 저희는 그동안 함께해주셨던 시간에 감사하게 생각합니다.\n저희 가는길지금을 이용해 주셔서 정말 감사합니다. 저희는 언제든지 유저를 다시 맞이할 준비가 되어 있습니다.\n그 때까지 건강하고 행복하시길 바랍니다. 안녕히 가세요. 😊`
      );
    },
  });

  return (
    <div className="relative">
      <div className="relative flex flex-col h-screen p-4 pt-24">
        <h1 className="text-2xl font-bold">정말 탈퇴하시겠어요?</h1>
        <p className="mt-3 text-base">
          탈퇴 시 계정의 모든 정보는 삭제되고
          <br />
          재가입 시에도 복구하기 어려워요.
        </p>

        <form className="flex flex-col flex-1 pt-24 gap-y-3">
          <div>
            <p className="text-[#7C8183]">Email</p>
            <input
              type="text"
              className="w-full p-3 mt-2 mb-5 text-lg rounded-xl bg-slate-100"
              value={form.email}
              onChange={({ currentTarget }) =>
                setForm((prev) => ({ ...prev, email: currentTarget.value }))
              }
              placeholder="이메일 입력"
            />
          </div>

          <div>
            <p className="text-[#7C8183]">Password</p>
            <input
              type="password"
              className="w-full p-3 mt-2 mb-5 text-lg rounded-xl bg-slate-100"
              value={form.password}
              onChange={({ currentTarget }) =>
                setForm((prev) => ({ ...prev, password: currentTarget.value }))
              }
              placeholder="비밀번호 입력"
            />
          </div>
          <div className="flex flex-1" />
          <button
            type="submit"
            className={cn(
              "py-3 mb-20 text-xl font-semibold text-white bg-black rounded-xl",
              {
                "bg-[#DDD]": !form.email || !form.password,
              }
            )}
            disabled={!form.email || !form.password}
            onClick={(e) => {
              e.preventDefault();
              loginMutate(form);
            }}
          >
            탈퇴하기
          </button>
        </form>
      </div>
      {isOpenCheckModal && (
        <div className="absolute top-0 flex items-center justify-center w-screen h-screen">
          <div className="absolute top-0 w-full h-full bg-black opacity-40"></div>
          <div className="absolute w-[82%] flex items-center flex-col bg-white rounded-xl px-6 pt-7 pb-6">
            <h2 className="text-xl font-semibold text-black">
              정말 탈퇴할까요?
            </h2>
            <div className="flex w-full gap-x-2 mt-[30px]">
              <button
                className="flex flex-1 py-3 border rounded-md border-[#999] text-[#999] justify-center"
                onClick={() => logoutMutate(token)}
              >
                <p>아니요</p>
              </button>
              <button
                className="flex justify-center flex-1 py-3 text-white bg-black rounded-md"
                onClick={() => deleteMemberMutate()}
              >
                탈퇴할래요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountPage;
