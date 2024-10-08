import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import {Player} from '../_common/interfaces/Player';

const Hall = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    console.log("useEffect Fetching Hall of Fame");
    if (!session) return;
    const fetchHallOfFame = async () => {
      try {
        setLoading(true);
        console.log("Fetching Hall of Fame");
        const res = await fetch('/api/player/hall/');
        const data = await res.json();
        console.log(data);
        setPlayers(data.data);
      } catch (error) {
        console.error('Failed to fetch Hall of Fame:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHallOfFame();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
    	<>
        <Table 
          color="default"
          selectionMode="none" 
          classNames={{
            table: "text-2xl",
            th: "text-2xl",
            td: " text-center text-3xl",
            tr: "text-4xl border-dotted border-x-0 border-t-0 border-b",
            tbody: "text-2xl"

          }} 
          aria-label="Kaotika Students">
          <TableHeader>
            <TableColumn className="text-center">Avatar</TableColumn>
            <TableColumn className="text-center">Name</TableColumn>
            <TableColumn className="text-center">Level</TableColumn>
            <TableColumn className="text-center">Experience</TableColumn>
            <TableColumn className="text-center">Gold</TableColumn>
            <TableColumn className="text-center">Status</TableColumn>
            <TableColumn className="text-center">Is Legend?</TableColumn>
          </TableHeader>
          <TableBody>
            {players?.map((player) => (
              <TableRow key={player._id}>
                <TableCell className="text-center"><div className="flex justify-center"><Image src={player.avatar} alt="User Avatar" width={64} height={64} className="sepia rounded-full" /></div></TableCell>
                <TableCell className="text-center">{player.nickname}</TableCell>
                <TableCell className="text-center">{player.level}</TableCell> 
                <TableCell className="text-center">{player.experience}</TableCell>
                <TableCell className="text-center">{player.gold}</TableCell>
                <TableCell className="text-center">{player.attributes.constitution + player.attributes.dexterity - player.attributes.insanity / 2 > 0 
                  ? <div className="flex justify-center"><Image src="/images/icons/heart.png" alt="Heart imager" width={64} height={64} className="sepia rounded-full" /></div>
                  : <div className="flex justify-center"><Image src="/images/icons/cross.png" alt="Heart imager" width={64} height={64} className="sepia rounded-full" /></div>}
                </TableCell>
                <TableCell className="text-center">{player.is_active 
                  ? <div className="flex justify-center"><Image src="/images/icons/playing.png" alt="Heart imager" width={64} height={64} className="sepia rounded-full" /></div>
                  : <div className="flex justify-center"><Image src="/images/icons/legend.png" alt="Heart imager" width={64} height={64} className="sepia rounded-full" /></div>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
		</Layout>
  )
}



export default Hall;
