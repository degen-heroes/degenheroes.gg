/**
 * @fileoverview Unstuck heroes from Crystalvale.
 */

const DFK_CHAIN_ID = 53935;

const ABI_HEROES = JSON.parse(
  '[{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getUserHeroes","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getHero","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"components":[{"internalType":"uint256","name":"summonedTime","type":"uint256"},{"internalType":"uint256","name":"nextSummonTime","type":"uint256"},{"internalType":"uint256","name":"summonerId","type":"uint256"},{"internalType":"uint256","name":"assistantId","type":"uint256"},{"internalType":"uint32","name":"summons","type":"uint32"},{"internalType":"uint32","name":"maxSummons","type":"uint32"}],"internalType":"struct IHeroTypes.SummoningInfo","name":"summoningInfo","type":"tuple"},{"components":[{"internalType":"uint256","name":"statGenes","type":"uint256"},{"internalType":"uint256","name":"visualGenes","type":"uint256"},{"internalType":"enum IHeroTypes.Rarity","name":"rarity","type":"uint8"},{"internalType":"bool","name":"shiny","type":"bool"},{"internalType":"uint16","name":"generation","type":"uint16"},{"internalType":"uint32","name":"firstName","type":"uint32"},{"internalType":"uint32","name":"lastName","type":"uint32"},{"internalType":"uint8","name":"shinyStyle","type":"uint8"},{"internalType":"uint8","name":"class","type":"uint8"},{"internalType":"uint8","name":"subClass","type":"uint8"}],"internalType":"struct IHeroTypes.HeroInfo","name":"info","type":"tuple"},{"components":[{"internalType":"uint256","name":"staminaFullAt","type":"uint256"},{"internalType":"uint256","name":"hpFullAt","type":"uint256"},{"internalType":"uint256","name":"mpFullAt","type":"uint256"},{"internalType":"uint16","name":"level","type":"uint16"},{"internalType":"uint64","name":"xp","type":"uint64"},{"internalType":"address","name":"currentQuest","type":"address"},{"internalType":"uint8","name":"sp","type":"uint8"},{"internalType":"enum IHeroTypes.HeroStatus","name":"status","type":"uint8"}],"internalType":"struct IHeroTypes.HeroState","name":"state","type":"tuple"},{"components":[{"internalType":"uint16","name":"strength","type":"uint16"},{"internalType":"uint16","name":"intelligence","type":"uint16"},{"internalType":"uint16","name":"wisdom","type":"uint16"},{"internalType":"uint16","name":"luck","type":"uint16"},{"internalType":"uint16","name":"agility","type":"uint16"},{"internalType":"uint16","name":"vitality","type":"uint16"},{"internalType":"uint16","name":"endurance","type":"uint16"},{"internalType":"uint16","name":"dexterity","type":"uint16"},{"internalType":"uint16","name":"hp","type":"uint16"},{"internalType":"uint16","name":"mp","type":"uint16"},{"internalType":"uint16","name":"stamina","type":"uint16"}],"internalType":"struct IHeroTypes.HeroStats","name":"stats","type":"tuple"},{"components":[{"internalType":"uint16","name":"strength","type":"uint16"},{"internalType":"uint16","name":"intelligence","type":"uint16"},{"internalType":"uint16","name":"wisdom","type":"uint16"},{"internalType":"uint16","name":"luck","type":"uint16"},{"internalType":"uint16","name":"agility","type":"uint16"},{"internalType":"uint16","name":"vitality","type":"uint16"},{"internalType":"uint16","name":"endurance","type":"uint16"},{"internalType":"uint16","name":"dexterity","type":"uint16"},{"internalType":"uint16","name":"hpSm","type":"uint16"},{"internalType":"uint16","name":"hpRg","type":"uint16"},{"internalType":"uint16","name":"hpLg","type":"uint16"},{"internalType":"uint16","name":"mpSm","type":"uint16"},{"internalType":"uint16","name":"mpRg","type":"uint16"},{"internalType":"uint16","name":"mpLg","type":"uint16"}],"internalType":"struct IHeroTypes.HeroStatGrowth","name":"primaryStatGrowth","type":"tuple"},{"components":[{"internalType":"uint16","name":"strength","type":"uint16"},{"internalType":"uint16","name":"intelligence","type":"uint16"},{"internalType":"uint16","name":"wisdom","type":"uint16"},{"internalType":"uint16","name":"luck","type":"uint16"},{"internalType":"uint16","name":"agility","type":"uint16"},{"internalType":"uint16","name":"vitality","type":"uint16"},{"internalType":"uint16","name":"endurance","type":"uint16"},{"internalType":"uint16","name":"dexterity","type":"uint16"},{"internalType":"uint16","name":"hpSm","type":"uint16"},{"internalType":"uint16","name":"hpRg","type":"uint16"},{"internalType":"uint16","name":"hpLg","type":"uint16"},{"internalType":"uint16","name":"mpSm","type":"uint16"},{"internalType":"uint16","name":"mpRg","type":"uint16"},{"internalType":"uint16","name":"mpLg","type":"uint16"}],"internalType":"struct IHeroTypes.HeroStatGrowth","name":"secondaryStatGrowth","type":"tuple"},{"components":[{"internalType":"uint16","name":"mining","type":"uint16"},{"internalType":"uint16","name":"gardening","type":"uint16"},{"internalType":"uint16","name":"foraging","type":"uint16"},{"internalType":"uint16","name":"fishing","type":"uint16"}],"internalType":"struct IHeroTypes.HeroProfessions","name":"professions","type":"tuple"}],"internalType":"struct IHeroTypes.Hero","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]',
);
const ABI_QUESTS = JSON.parse(
  '[{"inputs":[{"internalType":"uint256","name":"heroId","type":"uint256"}],"name":"getHeroQuest","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"questAddress","type":"address"},{"internalType":"uint8","name":"level","type":"uint8"},{"internalType":"uint256[]","name":"heroes","type":"uint256[]"},{"internalType":"address","name":"player","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"startAtTime","type":"uint256"},{"internalType":"uint256","name":"completeAtTime","type":"uint256"},{"internalType":"uint8","name":"attempts","type":"uint8"},{"internalType":"enum QuestStatus","name":"status","type":"uint8"}],"internalType":"struct Quest","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getAccountActiveQuests","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"questAddress","type":"address"},{"internalType":"uint8","name":"level","type":"uint8"},{"internalType":"uint256[]","name":"heroes","type":"uint256[]"},{"internalType":"address","name":"player","type":"address"},{"internalType":"uint256","name":"startBlock","type":"uint256"},{"internalType":"uint256","name":"startAtTime","type":"uint256"},{"internalType":"uint256","name":"completeAtTime","type":"uint256"},{"internalType":"uint8","name":"attempts","type":"uint8"},{"internalType":"enum QuestStatus","name":"status","type":"uint8"}],"internalType":"struct Quest[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_heroId","type":"uint256"}],"name":"completeQuest","outputs":[],"stateMutability":"nonpayable","type":"function"}]',
);

const HEROES_CONTRACT = '0xeb9b61b145d6489be575d3603f4a704810e143df';
const QUEST_CORE_V2_CONTRACT = '0xe9abfbc143d7cef74b5b793ec5907fa62ca53154';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

async function init($) {
  if (typeof window.ethereum === 'undefined') {
    console.log('Metamask not connected.');
    return;
  }

  $('#connect-metamask').click(handleConnect);
}

/**
 * Handles button click to connect - starts the process.
 *
 * @return {Promise<void>}
 */
async function handleConnect() {
  $('#connect-metamask').hide();
  const web3 = new Web3(window.ethereum); // initialize Web3
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const chainId = await web3.eth.net.getId();

  // Check if on CV
  if (chainId !== DFK_CHAIN_ID) {
    $('#not-on-dfkchain').removeClass('hide');
    return;
  }

  $('#address').text(`Your Address is: ${account}`);
  $('#prompt-start').removeClass('hide');

  $('#search-by-address').click(async () => {
    const inputAddress = $('#input-address').val();
    updateStatus(`Checking Stuck Quests for: ${inputAddress}`);
    $('#check-stuck-heroes').removeClass('hide');
    $('#prompt-start').hide();
    await checkStuckHeroes(inputAddress, web3);
  });

  $('#search-enduser').click(async () => {
    updateStatus(`Checking Your Stuck Quests...`);
    $('#check-stuck-heroes').removeClass('hide');
    $('#prompt-start').hide();
    await checkStuckHeroes(account, web3);
  });
}

/**
 * Will fetch user's heroes and check if they are stuck.
 *
 * @param {string} accountAddress The account's address.
 * @return {Promise<Array<string>>}
 */
async function checkStuckHeroes(accountAddress, web3) {
  try {
    const heroIds = await getHeroIdsByAddress(accountAddress, web3);
    updateStatus(`Found ${heroIds.length} heroes. Fetching their status...`);

    const heroes = await getHeroesByIds(heroIds, web3);
    updateStatus(`Heroes data fetched. Fetching your quests...`);

    const activeQuests = await getQuestsByAccount(accountAddress, web3);
    updateStatus(
      `Fetched ${activeQuests.length} active quests. Will now check for stuck quests...`,
    );

    const stuckHeroes = await findStuckHeroes(heroes, activeQuests, web3);

    if (!stuckHeroes.length) {
      $('#spinner-check-heroes').hide();
      return;
    }

    const stuckQuests = await fetchStuckQuests(stuckHeroes, web3);

    await setupResolveQuests(stuckQuests, stuckHeroes, accountAddress, web3);

    return activeQuests;
  } catch (ex) {
    updateStatus(`Error: ${ex.message}`);
    updateStatus(`Operation failed - please refresh and try again.`);
    console.error('checkStuckHeroes() Error:', ex);
    $('#spinner-check-heroes').hide();
  }
}

/**
 * Fetch the hero ids of this address.
 *
 * @param {string} accountAddress The account's address.
 * @param {Object} web3 The web3 instance.
 * @return {Promise<Array<string>>}
 */
async function getHeroIdsByAddress(accountAddress, web3) {
  const heroesContract = new web3.eth.Contract(ABI_HEROES, HEROES_CONTRACT);
  const heroIds = await heroesContract.methods
    .getUserHeroes(accountAddress)
    .call();

  return heroIds;
}

/**
 * Fetch the hero objects based on the ids fetched.
 *
 * @param {Array<string>} heroIds The hero ids.
 * @param {Object} web3 The web3 instance.
 * @return {Promise<Array<string>>}
 */
async function getHeroesByIds(heroIds, web3) {
  const heroesContract = new web3.eth.Contract(ABI_HEROES, HEROES_CONTRACT);

  const heroes = [];
  for (let heroId of heroIds) {
    const hero = await heroesContract.methods.getHero(heroId).call();
    heroes.push(hero);
  }

  return heroes;
}

/**
 * Fetch the active quests of the account.
 *
 * @param {string} accountAddress The account's address.
 * @param {Object} web3 The web3 instance.
 * @return {Promise<Array<Object>>} The active quests.
 */
async function getQuestsByAccount(accountAddress, web3) {
  const questContract = new web3.eth.Contract(
    ABI_QUESTS,
    QUEST_CORE_V2_CONTRACT,
  );

  const activeQuests = await questContract.methods
    .getAccountActiveQuests(accountAddress)
    .call();

  return activeQuests;
}

/**
 * Main business logic of finding stuck heroes (quests) - the way this
 * works is by iterating over all heroes and comparing their quest
 * with the array of current quests.
 *
 * If a hero is found that is on a quest, and that quest is not on the
 * active quests, that hero is stuck.
 *
 * @param {Array<Object>} heroes The account's heroes.
 * @param {Array<Object>} activeQuests Active quests of account.
 * @param {Object} web3 The web3 instance.
 * @return {Promise<Array<Object>>} The stuck hero objects.
 */
async function findStuckHeroes(heroes, activeQuests, web3) {
  // Collect all hero ids that are referenced in the active quests
  const allHeroesQuesting = [];
  activeQuests.forEach((quest) => {
    quest.heroes.forEach((heroId) => {
      allHeroesQuesting.push(heroId);
    });
  });

  const stuckHeroes = heroes.filter((hero) => {
    const { currentQuest } = hero.state;
    if (currentQuest === ZERO_ADDRESS) {
      return false;
    }
    if (allHeroesQuesting.includes(hero.id)) {
      return false;
    }

    return true;
  });

  const stuckHeroIds = stuckHeroes.map((hero) => hero.id);

  if (stuckHeroes.length) {
    updateStatus(
      `Found ${stuckHeroes.length} stuck heroes: ${stuckHeroIds.join(', ')}`,
    );
  } else {
    $('#spinner-check-heroes').hide();
    updateStatus(`No stuck heroes found.`);
  }

  return stuckHeroes;
}

/**
 * Will fetch the stuck quests of the stuck heroes.
 *
 * @param {Array<Object>} stuckHeroes Stuck heroes.
 * @param {Object} web3 The web3 instance.
 * @return {Promise<Array<Object>>} The stuck quest objects.
 */
async function fetchStuckQuests(stuckHeroes, web3) {
  const stuckQuests = [];
  const stuckQuestsHeroIds = [];

  updateStatus(`Fetching quest status of stuck heroes...`);

  const questContract = new web3.eth.Contract(
    ABI_QUESTS,
    QUEST_CORE_V2_CONTRACT,
  );

  for (let hero of stuckHeroes) {
    // check if stuck quest having this hero has already been fetched and skip...
    if (stuckQuestsHeroIds.includes(hero.id)) {
      continue;
    }

    // Fetch the quest and store
    const quest = await questContract.methods.getHeroQuest(hero.id).call();

    quest.heroes.forEach((heroId) => {
      stuckQuestsHeroIds.push(heroId);
    });

    stuckQuests.push(quest);
  }

  updateStatus(`Fetched ${stuckQuests.length} stuck quests.`);

  return stuckQuests;
}

/**
 * Will setup the quest resolve forms.
 *
 * @param {Array<Object>} stuckQuests The stuck quests.
 * @param {Array<Object>} stuckHeroes Stuck heroes.
 * @param {string} accountAddress The account's address.
 * @param {Object} web3 The web3 instance.
 * @return {Promise<void>}
 */
async function setupResolveQuests(
  stuckQuests,
  stuckHeroes,
  accountAddress,
  web3,
) {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  $('#spinner-check-heroes').hide();

  const $resolve = $('#resolve-quests');

  $resolve.append(`<h2>Stuck Quests</h2>`);

  const canSign = accountAddress === account;

  stuckQuests.forEach((quest, index) => {
    const $btn = $('<button/>', {
      text: `Complete Quest`,
      id: 'btn_' + index,
      click: handleResolve.bind(null, quest, web3),
    });
    const $p = $('<p/>');

    if (canSign) {
      $p.append($btn);
    }

    const heroIds = quest.heroes.join(', ');
    $p.append(`Quest Id: ${quest.id} - Heroes: ${heroIds}`);
    $resolve.append($p);
  });
}

async function handleResolve(quest, web3) {
  const questContract = new web3.eth.Contract(
    ABI_QUESTS,
    QUEST_CORE_V2_CONTRACT,
  );
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];

  const [heroId] = quest.heroes;

  await questContract.methods.completeQuest(heroId).send({
    from: account,
  });
}

/**
 * Will output current status to the end user.
 *
 * @param {string} status The status update.
 */
function updateStatus(status) {
  $('#check-status').append(`<p>${status}</p>`);
}

jQuery(document).ready(init);
