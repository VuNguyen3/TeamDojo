import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TeamdojoSharedModule } from 'app/shared';
import { SkillResolve, TEAMS_ROUTES, TeamsComponent } from './';
import { TeamsAchievementsComponent } from './teams-achievements.component';
import { TeamsSkillsComponent } from './teams-skills.component';
import { TeamsSelectionComponent } from 'app/shared/teams-selection/teams-selection.component';
import {
    AllBadgeSkillsResolve,
    AllBadgesResolve,
    AllCommentsResolve,
    AllLevelSkillsResolve,
    AllLevelsResolve,
    AllTeamsResolve,
    TeamAndTeamSkillResolve
} from './teams.route';
import { TeamsService } from './teams.service';
import { TeamsSkillsService } from './teams-skills.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamsAchievementsService } from 'app/teams/teams-achievements.service';
import { SkillDetailsComponent } from 'app/teams/skill-details/skill-details.component';
import { SkillDetailsInfoComponent } from 'app/teams/skill-details/skill-details-info/skill-details-info.component';
import { SkillDetailsCommentsComponent } from 'app/teams/skill-details/skill-details-comments/skill-details-comments.component';
import { AllSkillsResolve, AllTeamSkillsResolve } from 'app/teams/teams.route';
import { SkillDetailsRatingComponent } from 'app/teams/skill-details/skill-details-rating/skill-details-rating.component';
import { SkillService } from 'app/entities/skill';

@NgModule({
    imports: [TeamdojoSharedModule, RouterModule.forChild(TEAMS_ROUTES), NgbModule],
    declarations: [
        TeamsComponent,
        TeamsAchievementsComponent,
        TeamsSkillsComponent,
        TeamsSelectionComponent,
        SkillDetailsComponent,
        SkillDetailsInfoComponent,
        SkillDetailsCommentsComponent,
        SkillDetailsRatingComponent
    ],
    entryComponents: [TeamsSelectionComponent],
    providers: [
        TeamsService,
        TeamsSkillsService,
        TeamsAchievementsService,
        TeamAndTeamSkillResolve,
        SkillResolve,
        AllLevelsResolve,
        AllBadgesResolve,
        AllLevelSkillsResolve,
        AllBadgeSkillsResolve,
        AllSkillsResolve,
        AllCommentsResolve,
        AllTeamsResolve,
        SkillService,
        AllTeamSkillsResolve
    ],
    exports: [SkillDetailsInfoComponent, SkillDetailsCommentsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamsModule {}
