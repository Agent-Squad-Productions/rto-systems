--[[
───────────────────────────────────────────────────────────────

	RTO System In-Game Link (cl.lua) - Created by Agent Squad Prodcutions
	
	Website: https://agentsquad.org
    Documentation: https://docs.agentsquad.org/rtosystem
    Discord: https://discord.agentsquad.org

───────────────────────────────────────────────────────────────
]]
-- Code --
Citizen.CreateThread(function()
    TriggerEvent('chat:addSuggestion', '/signal', 'Send an emergency sound into LEO RTO.', {
    { name="100 or 99 or 3" }
})
end)

Citizen.CreateThread(function()
    TriggerEvent('chat:addSuggestion', '/pager', 'Send an pager sound into FR RTO.', {
    { name="fire or medical or rescue or end" }
})
end)

Citizen.CreateThread(function()
    TriggerEvent('chat:addSuggestion', '/panic', 'Send an panic sound into LEO RTO.', {
})
end)

-- Signal Command -- 
RegisterNetEvent('RTOSystem-99')
AddEventHandler('RTOSystem-99', function(msg)
	TriggerServerEvent('DiscordSend-99')
end)

RegisterNetEvent('RTOSystem-100')
AddEventHandler('RTOSystem-100', function()
	TriggerServerEvent('DiscordSend-100')
end)

RegisterNetEvent('RTOSystem-3')
AddEventHandler('RTOSystem-3', function()
	TriggerServerEvent('DiscordSend-3')
end)

-- Pager Command -- 
RegisterNetEvent('RTOSystem-fire')
AddEventHandler('RTOSystem-fire', function(msg)
	TriggerServerEvent('DiscordSend-fire')
end)

RegisterNetEvent('RTOSystem-medical')
AddEventHandler('RTOSystem-medical', function()
	TriggerServerEvent('DiscordSend-medical')
end)

RegisterNetEvent('RTOSystem-rescue')
AddEventHandler('RTOSystem-rescue', function()
	TriggerServerEvent('DiscordSend-rescue')
end)

RegisterNetEvent('RTOSystem-end')
AddEventHandler('RTOSystem-end', function()
	TriggerServerEvent('DiscordSend-end')
end)

-- Panic Command -- 
RegisterNetEvent('RTOSystem-panic')
AddEventHandler('RTOSystem-panic', function(msg)
	TriggerServerEvent('DiscordSend-panic')
end)
