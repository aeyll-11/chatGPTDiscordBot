const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.apiKey,
});
const openai = new OpenAIApi(configuration);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatgpt')
		.setDescription('Anass il en a besoin')
		.addStringOption(option => 
			option.setName('question')
			.setDescription('Poser une question')
			.setRequired(true)
			)
		,
	async execute(interaction) {
		const question = interaction.options.getString('question');
		if(question != null) {
			const completion = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: question,
				temperature: 0.8,
				max_tokens: 150
			  });
			await interaction.reply(completion.data.choices[0].text);
		}
	},
};