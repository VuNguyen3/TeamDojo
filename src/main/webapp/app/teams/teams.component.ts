import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from 'app/shared/model/team.model';
import { sortLevels } from 'app/shared';
import { IBadge } from 'app/shared/model/badge.model';
import { IDimension } from 'app/shared/model/dimension.model';
import { IBadgeSkill } from 'app/shared/model/badge-skill.model';

@Component({
    selector: 'jhi-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.scss']
})
export class TeamsComponent implements OnInit {
    @Output() changeTeam = new EventEmitter<any>();

    team: ITeam;
    badges: IBadge[];

    constructor(private dataUtils: JhiDataUtils, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ team, levels, badges, levelSkills, badgeSkills }) => {
            this.team = team;
            this.badges = badges.body;

            const groupedLevelSkills = {};
            levelSkills.body.forEach(levelSkill => {
                groupedLevelSkills[levelSkill.levelId] = groupedLevelSkills[levelSkill.levelId] || [];
                groupedLevelSkills[levelSkill.levelId].push(Object.assign(levelSkill));
            });

            const levelsByDimensionId = {};
            levels.body.forEach(level => {
                levelsByDimensionId[level.dimensionId] = levelsByDimensionId[level.dimensionId] || [];
                levelsByDimensionId[level.dimensionId].push(Object.assign(level, { skills: groupedLevelSkills[level.id] }));
            });
            for (const dimensionId in levelsByDimensionId) {
                if (levelsByDimensionId.hasOwnProperty(dimensionId)) {
                    levelsByDimensionId[dimensionId] = sortLevels(levelsByDimensionId[dimensionId]).reverse();
                }
            }

            const groupedBadgeSkills = {};
            badgeSkills.body.forEach((badgeSkill: IBadgeSkill) => {
                groupedBadgeSkills[badgeSkill.badgeId] = groupedBadgeSkills[badgeSkill.badgeId] || [];
                groupedBadgeSkills[badgeSkill.badgeId].push(Object.assign(badgeSkill));
            });
            this.badges.forEach(badge => {
                badge.skills = groupedBadgeSkills[badge.id] || [];
            });
            const badgesByDimensionId = {};
            this.badges.forEach(badge => {
                badge.dimensions.forEach((dimension: IDimension) => {
                    badgesByDimensionId[dimension.id] = badgesByDimensionId[dimension.id] || [];
                    badgesByDimensionId[dimension.id].push(Object.assign(badge));
                });
            });

            this.team.participations.forEach(dimension => {
                dimension.levels = levelsByDimensionId[dimension.id] || [];
                dimension.badges = badgesByDimensionId[dimension.id] || [];
            });
        });
        this.changeTeam.emit(this.team);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }
}
