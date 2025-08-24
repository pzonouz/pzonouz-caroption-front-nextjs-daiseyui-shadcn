"use client";
import { LucideMenu } from "lucide-react";

import Link from "next/link";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "../Shared/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { setAccess } from "../../lib/features/SessionSlice";

const CRMMenu = ({ user }: { user: User | undefined }) => {
  const loading = useAppSelector((state) => state?.loading?.show);
  const { data, status } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status == "authenticated") dispatch(setAccess((data as any)?.access));
  }, [status, data, dispatch]);
  const menuList = [
    { text: "خانه", link: "/crm" },
    { text: "افراد", link: "/crm/persons" },
    { text: "دسته بندی ها", link: "/crm/categories" },
    { text: "کالاها", link: "/crm/products" },
    {
      text: "فاکتورها",
      submenu: [
        { text: "خرید", link: "/crm/invoices/buy" },
        { text: "فروش", link: "/crm/invoices/sell" },
      ],
    },
  ];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-0 left-0" asChild>
              <Button variant="link">
                <LucideMenu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 bg-white" align="start">
              <Link
                href={"profile"}
                key={user?.id}
                className="text-xs cursor-pointer"
              >
                <DropdownMenuItem>{user?.name}</DropdownMenuItem>
              </Link>
              {menuList?.map((item) => {
                if (item.submenu?.length) {
                  return (
                    <DropdownMenuSub key={item.text}>
                      <DropdownMenuSubTrigger>
                        {item?.text}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-white w-32">
                        {item?.submenu?.map((subItem) => (
                          <Link
                            href={`${subItem?.link}`}
                            key={subItem.text}
                            className="cursor-pointer"
                          >
                            <DropdownMenuItem>{subItem?.text}</DropdownMenuItem>
                          </Link>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  );
                } else {
                  if (!item?.link || !item?.text) return null;
                  return (
                    <Link
                      href={item?.link}
                      key={item?.text}
                      className="cursor-pointer"
                    >
                      <DropdownMenuItem>{item?.text}</DropdownMenuItem>
                    </Link>
                  );
                }
              })}
              <DropdownMenuItem
                className="cursor-pointer"
                key={"signout"}
                onClick={() => {
                  signOut();
                }}
              >
                خروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
};

export default CRMMenu;
