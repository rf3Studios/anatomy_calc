<?php
/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 rf3Studios.com <Rich Friedel>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
?>
<!DOCTYPE html>
<html>
    <head>
        <link type="text/css" rel="stylesheet" href="styles/style_reset.css">
        <link type="text/css" rel="stylesheet" href="styles/smoothness/jquery-ui-1.10.3.custom.css">
        <link type="text/css" rel="stylesheet" href="styles/main_styles.css">
        <script type="text/javascript" src="scripts/jquery-1.9.1.js"></script>
        <script type="text/javascript" src="scripts/jquery-ui-1.10.3.custom.js"></script>
        <script type="text/javascript" src="scripts/grade_utils.js"></script>
        <script type="text/javascript" src="scripts/lecture.js"></script>
        <script type="text/javascript" src="scripts/lab.js"></script>
        <meta name="description"
              content="Anatomy Grade Calculator for students in Professor Storm's USC Upstate Anatomy class">
        <meta name="author" content="Rich Friedel">
        <title>Anatomy Grade Calculator (Unofficial)</title>
    </head>
    <body>
        <h1>Anatomy Grade Calculator (Unofficial)</h1>

        <h2>An unofficial grade calculator for Prof. Storm's USC Upstate Anatomy Class</h2>

        <form id="grades_input_form" name="grades_input_form" action="" method="post">
            <div id="lec_wrapper">
                <!-- Lecture -->
                <h2>Lecture</h2>

                <fieldset id="lec_exams_wrapper">
                    <!-- Exam Input -->
                    <legend>Exam Input<img src="images/dialog_information.png" title="Information" width="22"
                                           height="22" class="info_icon"></legend>
                    <label for="lec_exam_1">Exam 1:
                        <input type="text" id="lec_exam_1" name="lec_exam_1">
                    </label>
                    <label for="lec_exam_2">Exam 2:
                        <input type="text" id="lec_exam_2" name="lec_exam_2">
                    </label>
                    <label for="lec_exam_3">Exam 3:
                        <input type="text" id="lec_exam_3" name="lec_exam_3">
                    </label>
                    <label for="lec_exam_4">Exam 4:
                        <input type="text" id="lec_exam_4" name="lec_exam_4">
                    </label>
                </fieldset>
                <fieldset id="lec_final_exam_wrapper">
                    <!-- Final Exam Input -->
                    <legend>Final Exam Input<img src="images/dialog_information.png" title="Information" width="22"
                                                 height="22" class="info_icon"></legend>
                    <label for="lec_final_exam">Final Exam:
                        <input type="text" id="lec_final_exam" name="lec_final_exam">
                    </label>
                </fieldset>
                <fieldset id="lec_quizzes_wrapper">
                    <!-- Quiz Input -->
                    <legend>Quiz Input<img src="images/dialog_information.png" title="Information" width="22"
                                           height="22" class="info_icon"></legend>
                    <label for="lec_quiz_1">Quiz 1:
                        <input type="text" id="lec_quiz_1" name="lec_quiz_1"> / 10
                    </label>
                    <label for="lec_quiz_2">Quiz 2:
                        <input type="text" id="lec_quiz_2" name="lec_quiz_2"> / 10
                    </label>
                    <label for="lec_quiz_3">Quiz 3:
                        <input type="text" id="lec_quiz_3" name="lec_quiz_3"> / 10
                    </label>
                    <label for="lec_quiz_4">Quiz 4:
                        <input type="text" id="lec_quiz_4" name="lec_quiz_4"> / 10
                    </label>
                    <label for="lec_quiz_5">Quiz 5:
                        <input type="text" id="lec_quiz_5" name="lec_quiz_5"> / 10
                    </label>
                    <label for="lec_quiz_6">Quiz 6:
                        <input type="text" id="lec_quiz_6" name="lec_quiz_6"> / 10
                    </label>
                    <label for="lec_quiz_7">Quiz 7:
                        <input type="text" id="lec_quiz_7" name="lec_quiz_7"> / 12
                    </label>
                    <label for="lec_quiz_8">Quiz 8:
                        <input type="text" id="lec_quiz_8" name="lec_quiz_8"> / 10
                    </label>
                    <label for="lec_quiz_9">Quiz 9:
                        <input type="text" id="lec_quiz_9" name="lec_quiz_9"> / 10
                    </label>
                    <label for="lec_quiz_10">Quiz 10:
                        <input type="text" id="lec_quiz_10" name="lec_quiz_10"> / 10
                    </label>
                    <label for="lec_quiz_11">Quiz 11:
                        <input type="text" id="lec_quiz_11" name="lec_quiz_11"> / 10
                    </label>
                </fieldset>
                <fieldset id="lec_attendance_wrapper">
                    <!-- Attendance Input -->
                    <legend>Attendance Input<img src="images/dialog_information.png" title="Information" width="22"
                                                 height="22" class="info_icon"></legend>
                    <label for="lec_attendance">Days Missed:
                        <input type="text" id="lec_attendance" name="lec_attendance">
                    </label>
                </fieldset>
            </div>
            <div id="lab_wrapper">
                <!-- Lab -->
                <h2>Lab</h2>

                <fieldset id="lab_exams_wrapper">
                    <!-- Exam Input -->
                    <legend>Exam Input<img src="images/dialog_information.png" title="Information" width="22"
                                           height="22" class="info_icon"></legend>
                    <label for="lab_exam_1">Exam 1:
                        <input type="text" id="lab_exam_1" name="lab_exam_1">
                    </label>
                    <label for="lab_exam_2">Exam 2:
                        <input type="text" id="lab_exam_2" name="lab_exam_2">
                    </label>
                    <label for="lab_exam_3">Exam 3:
                        <input type="text" id="lab_exam_3" name="lab_exam_3">
                    </label>
                </fieldset>
                <fieldset id="lab_final_exam_wrapper">
                    <!-- Final Exam Input -->
                    <legend>Final Exam Input<img src="images/dialog_information.png" title="Information" width="22"
                                                 height="22" class="info_icon"></legend>
                    <label for="lab_final_exam">Final Exam:
                        <input type="text" id="lab_final_exam" name="lab_final_exam">
                    </label>
                </fieldset>
                <fieldset id="lab_participation_wrapper">
                    <!-- Participation Input -->
                    <legend>Participation Input<img src="images/dialog_information.png" title="Information" width="22"
                                                    height="22" class="info_icon"></legend>
                    <label for="lab_participation">Participation:
                        <input type="text" id="lab_participation" name="lab_participation">
                    </label>
                </fieldset>
                <fieldset id="lab_attendance_wrapper">
                    <!-- Attendance Input -->
                    <legend>Attendance Input<img src="images/dialog_information.png" title="Information" width="22"
                                                 height="22" class="info_icon"></legend>
                    <label for="lab_attendance">Days Missed:
                        <input type="text" id="lab_attendance" name="lab_attendance">
                    </label>
                </fieldset>
            </div>
        </form>
        <div id="info_output">
            <h3>Grade Information<img src="images/dialog_information.png" title="Information" width="22" height="22"
                                      class="info_icon"></h3>

            <p>Your Grade Total: <span id="total_num_grade">0</span></p>

            <p>Letter Grade: <span id="total_letter_grade">F</span></p>
        </div>
        <div id="footer">
            <p><strong>Anatomy Grade Calculator</strong> &copy;2013
                <a href="http://rf3studios.com" target="_blank" title="rf3Studios.com">rf3Studios.com</a> under
                <a href="LICENSE" target="_blank" title="MIT License">MIT License</a> using
                <a href="http://jquery.com/" target="_blank" title="Uses jQuery">jQuery</a>
            </p>
        </div>
    </body>
</html>