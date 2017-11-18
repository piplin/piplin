<?php

/*
 * This file is part of Fixhub.
 *
 * Copyright (C) 2016 Fixhub.org
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Fixhub\Presenters;

use Fixhub\Models\Command;
use McCool\LaravelAutoPresenter\BasePresenter;

/**
 * The view presenter for a deploy step class.
 */
class DeployStepPresenter extends BasePresenter
{
    /**
     * Gets the deployment stage label from the numeric representation.
     *
     * @return string
     */
    public function name()
    {
        if (!is_null($this->wrappedObject->command_id)) {
            return $this->wrappedObject->command->name;
        } elseif ($this->wrappedObject->stage === Command::DO_INSTALL) {
            return trans('commands.install');
        } elseif ($this->wrappedObject->stage === Command::DO_ACTIVATE) {
            return trans('commands.activate');
        } elseif ($this->wrappedObject->stage === Command::DO_PURGE) {
            return trans('commands.purge');
        } elseif ($this->wrappedObject->stage === Command::DO_PREPARE) {
            return trans('commands.prepare');
        } elseif ($this->wrappedObject->stage === Command::DO_BUILD) {
            return trans('commands.build');
        } elseif ($this->wrappedObject->stage === Command::DO_TEST) {
            return trans('commands.test');
        } elseif ($this->wrappedObject->stage === Command::DO_RESULT) {
            return trans('commands.result');
        }

        return trans('commands.clone');
    }

    /**
     * Gets the deployment stage icon.
     *
     * @return string
     */
    public function icon()
    {
        $steps = [
            Command::DO_CLONE,
            Command::DO_INSTALL,
            Command::DO_ACTIVATE,
            Command::DO_PURGE,
        ];

        foreach ($steps as $step) {
            if ($this->wrappedObject->stage - $step == 1) {
                return 'fixhub-up text-yellow'; // post
            } elseif ($this->wrappedObject->stage - $step == -1) {
                return 'fixhub-down text-muted'; // pre
            }
        }

        return 'fixhub-right text-aqua';
    }
}
