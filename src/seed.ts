import dotenv from 'dotenv';
import axios from 'axios';
import { createTeam } from './graphql/services/team.service';

dotenv.config();

const populateNFLTeams = async () => {
  const teams = await axios
    .get(
      `https://www.thesportsdb.com/api/v1/json/${process.env.DATADB_API_KEY}/lookup_all_teams.php?id=${process.env.DATADB_NFL_ID}`
    )
    .then(response => {
      return response.data.teams;
    });

  teams.map((team: any) => {
    createTeam({
      name: team.strTeam,
      location: team.strStadiumLocation,
      logo_url: team.strTeamBadge,
      sport: 'Football',
      league: 'NFL',
      externalId: team.idTeam
    });
  });
};

populateNFLTeams();
