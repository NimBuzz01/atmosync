import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserHistory } from "@/lib/utils/feedback";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Card } from "./ui/card";

export function UserHistory() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>("");
  const [history, setHistory] = useState<
    {
      id: string;
      userId: string;
      createdAt: Date;
      ambiance: string;
      humanCount: string;
      soundLevel: string;
    }[]
  >([]);

  const fetchHistory = async () => {
    if (session?.user.id) {
      const userHistory = await getUserHistory(session?.user?.id);
      setHistory(userHistory);
      setUserId(session?.user.id as string);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={fetchHistory}>
          View History
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-slate-50">
        <DialogHeader>
          <DialogTitle>User History</DialogTitle>
        </DialogHeader>
        <div className="h-[500px]  overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-50 pr-2">
          {history ? (
            history.map((entry) => (
              <Card key={entry.id} className="mb-2 flex text-sm flex-col p-2">
                <p>
                  Ambiance: <span>{entry.ambiance}</span>
                </p>
                <p>Human Count: {entry.humanCount}</p>
                <p>Sound Level: {entry.soundLevel}</p>
                <p>
                  Created At:{" "}
                  {entry.createdAt.toString().slice(0, 19).replace("T", " ")}
                </p>
              </Card>
            ))
          ) : (
            <p>No History Found</p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
