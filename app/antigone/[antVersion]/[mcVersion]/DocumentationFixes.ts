import SemVer from "semver";

import {Goals} from "../Documentation";

export default class DocumentationFixes {

    // noinspection JSUnusedLocalSymbols
    private constructor() {}

    public static initialFilter(antVersion: string, mcVersion: string, goals: Goals) {
        mcVersion = SemVer.coerce(mcVersion.replace(/_/g, "."))?.toString() || "";
        let newGoals: Goals = goals;

        switch (true) {
            case SemVer.lt(antVersion, "1.0.1"): {
                newGoals = {};
                for (const [key, data] of Object.entries(goals)) {
                    if (pre1_0_1Broken.includes(key)) continue;

                    data.parameters = data.parameters.map(parameter => {
                        if (parameter.default?.includes("\n")) {
                            parameter.default = `[${parameter.default.replace("\n", ", ")}]`;
                        }
                        return parameter;
                    });

                    newGoals[key] = data;
                }
            }
        }

        return newGoals;
    }

}

const pre1_0_1Broken = [
    "antigone_panda_look_at_player",
    "antigone_panda_panic",
    "antigone_panda_roll",
    "antigone_panda_sit",
    "antigone_panda_sneeze",
    "antigone_parrot_wander",
    "antigone_perch_and_search",
    "antigone_phantom_attack_player_target",
    "antigone_bee_pollinate",
    "antigone_phantom_attack_strategy",
    "antigone_phantom_circle_around_anchor",
    "antigone_phantom_sweep_attack",
    "antigone_play_with_items",
    "antigone_polar_bear_attack_players",
    "antigone_polar_bear_hurt_by_target",
    "antigone_polar_bear_melee_attack",
    "antigone_polar_bear_panic",
    "antigone_pufferfish_puff",
    "antigone_rabbit_avoid_entity",
    "antigone_bee_wander",
    "antigone_rabbit_panic",
    "antigone_raid_garden",
    "antigone_raider_celebration",
    "antigone_raider_move_through_village",
    "antigone_random_float_around",
    "antigone_ranged_crossbow_attack",
    "antigone_seek_shelter",
    "antigone_shulker_attack",
    "antigone_shulker_defense_attack",
    "antigone_blaze_attack",
    "antigone_shulker_nearest_attack",
    "antigone_shulker_peek",
    "antigone_silverfish_merge_with_stone",
    "antigone_silverfish_wake_up_friends",
    "antigone_sleep",
    "antigone_slime_attack",
    "antigone_slime_float",
    "antigone_slime_keep_on_jumping",
    "antigone_slime_random_direction",
    "antigone_spider_attack",
    "antigone_spider_target",
    "antigone_squid_flee",
    "antigone_squid_random_movement",
    "antigone_stalk_prey",
    "antigone_strider_go_to_lava",
    "antigone_turtle_breed",
    "antigone_turtle_go_home",
    "antigone_turtle_go_to_water",
    "antigone_turtle_lay_egg",
    "antigone_turtle_panic",
    "antigone_turtle_random_stroll",
    "antigone_turtle_travel",
    "antigone_vex_charge_attack",
    "antigone_vex_copy_owner_target",
    "antigone_vex_random_move",
    "antigone_vindicator_break_door",
    "antigone_vindicator_johnny_attack",
    "antigone_wander_to_position",
    "antigone_cat_avoid_entity",
    "antigone_wither_do_nothing",
    "antigone_wolf_avoid_entity",
    "antigone_wolf_panic",
    "antigone_zombie_attack_turtle_egg",
    "antigone_cat_relax_on_owner",
    "antigone_cat_tempt",
    "antigone_defend_trusted_target",
    "antigone_dolphin_swim_to_treasure",
    "antigone_dolphin_swim_with_player",
    "antigone_drowned_attack",
    "antigone_drowned_go_to_beach",
    "antigone_bee_attack",
    "antigone_drowned_go_to_water",
    "antigone_drowned_swim_up",
    "antigone_drowned_trident_attack",
    "antigone_eat_block",
    "antigone_enderman_freeze_when_looked_at",
    "antigone_enderman_leave_block",
    "antigone_enderman_look_for_player",
    "antigone_enderman_take_block",
    "antigone_evoker_attack_spell",
    "antigone_evoker_casting_spell",
    "antigone_bee_become_angry_target",
    "antigone_evoker_summon_spell",
    "antigone_faceplant",
    "antigone_fish_swim",
    "antigone_bee_enter_hive",
    "antigone_fox_breed",
    "antigone_fox_float",
    "antigone_fox_follow_parent",
    "antigone_fox_look_at_player",
    "antigone_fox_melee_attack",
    "antigone_fox_panic",
    "antigone_fox_search_for_items",
    "antigone_bee_go_to_hive",
    "antigone_fox_stroll_through_village",
    "antigone_ghast_look",
    "antigone_ghast_shoot_fireball",
    "antigone_illusioner_blindness_spell",
    "antigone_illusioner_mirror_spell",
    "antigone_bee_go_to_known_flower",
    "antigone_llama_attack_wolf",
    "antigone_llama_hurt_by_target",
    "antigone_bee_grow_crop",
    "antigone_ocelot_avoid_entity",
    "antigone_bee_hurt_by_other",
    "antigone_ocelot_tempt",
    "antigone_panda_attack",
    "antigone_panda_avoid",
    "antigone_panda_breed",
    "antigone_panda_hurt_by_target",
    "antigone_panda_lie_on_back",
    "antigone_bee_locate_hive"
];
