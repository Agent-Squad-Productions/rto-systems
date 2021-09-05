--[[
───────────────────────────────────────────────────────────────

	RTO System In-Game Link (sv.lua) - Created by Agent Squad Prodcutions
	
	Website: https://agentsquad.org
    Documentation: https://docs.agentsquad.org/rtosystem
    Discord: https://discord.agentsquad.org

───────────────────────────────────────────────────────────────
]]
-- Code --

-- /Signal --
RegisterCommand('signal', function(source, args)
    local msg = table.concat(args, ' ')
	if IsPlayerAceAllowed(source, 'rto_system') then 
		if args[1] == nil then
			TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^1Enter a signal.')
		else
			if msg == '100' then
				TriggerClientEvent('RTOSystem-100', source)
			end
			if msg == '99' then
				TriggerClientEvent('RTOSystem-99', source)
			end
			if msg == '3' then
				TriggerClientEvent('RTOSystem-3', source)
			end
			TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^2Successfully Sent the Signal to RTO.')
		end
	else
		TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^1You do not have permissions to run that command.')
	end
end)

RegisterServerEvent('DiscordSend-99')
AddEventHandler('DiscordSend-99', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'signal 99')
end)

RegisterServerEvent('DiscordSend-100')
AddEventHandler('DiscordSend-100', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'signal 100')
end)

RegisterServerEvent('DiscordSend-3')
AddEventHandler('DiscordSend-3', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'signal 3')
end)

-- /Pager --
RegisterCommand('pager', function(source, args)
    local msg = table.concat(args, ' ')
	if IsPlayerAceAllowed(source, 'rto_system') then 
		if args[1] == nil then
			TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^1Enter a pager.')
		else
			if msg == 'fire' then
				TriggerClientEvent('RTOSystem-fire', source)
			end
			if msg == 'medical' then
				TriggerClientEvent('RTOSystem-medical', source)
			end
			if msg == 'rescue' then
				TriggerClientEvent('RTOSystem-rescue', source)
			end
			if msg == 'end' then
				TriggerClientEvent('RTOSystem-end', source)
			end
			TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^2Successfully Paged RTO.')
		end
	else
		TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^1You do not have permissions to run that command.')
	end
end)

RegisterServerEvent('DiscordSend-fire')
AddEventHandler('DiscordSend-fire', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'pager fire')
end)

RegisterServerEvent('DiscordSend-medical')
AddEventHandler('DiscordSend-medical', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'pager medical')
end)

RegisterServerEvent('DiscordSend-rescue')
AddEventHandler('DiscordSend-rescue', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'pager rescue')
end)

RegisterServerEvent('DiscordSend-end')
AddEventHandler('DiscordSend-end', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'pager end')
end)

-- /panic --
RegisterCommand('panic', function(source)
	if IsPlayerAceAllowed(source, 'rto_system') then 
		TriggerClientEvent('RTOSystem-panic', source)
		TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^2Panic Button sent Successfully.')
	else
		TriggerClientEvent('chatMessage', source, '^5RTO System', {255,255,255}, ' ^1You do not have permissions to run that command.')
	end
end)

RegisterServerEvent('DiscordSend-panic')
AddEventHandler('DiscordSend-panic', function()
	local playername = GetPlayerName(source)
	sendDiscord('RTO System (' .. playername .. ') - [In-Game Activiation]', 'panic')
end)

-- Discord Message --
function sendDiscord(name, message)
    PerformHttpRequest(Config.DiscordWebook, function(err, text, headers) end, 'POST', json.encode({username = name, content = message}), { ['Content-Type'] = 'application/json' })
end