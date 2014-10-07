/*!
 * Anatomy Grade Calculator
 * https://github.com/rf3Studios/anatomy_calc_web
 *
 * Copyright 2013, 2014 Rich Friedel
 * Released under the MIT license
 */

/**
 * Builds and initializes the number spinners
 *
 * Note: I would like to have used the HTML5 input attribute "number" but Firefox does not support it (Oct/2013)
 */
function buildNumberSpinners() {
    // Exam Spinners
    $("input[name*='_exam']").spinner({
        min: 0,
        max: 100,
        step: 0.01,
        numberFormat: "n",
        create: function () {
            $(this).spinner("value", $.cookie($(this).attr("id")));
        },
        stop: function (event, ui) {
            if ($(this).spinner("value") > 100) {
                $(this).css("background-color", "#FF9494");
            } else {
                $(this).css("background-color", "#FFFFFF");
                showGrade(generateFinalGrade());
                $.cookie($(this).attr("id"), $(this).spinner("value"), {expires: 365});
            }
        }
    });

    // Quiz Spinners
    $("input[name*='_quiz_']").spinner({
        min: 0,
        step: 1,
        create: function () {
            if ($(this).attr("id") !== "lec_quiz_7") {
                $(this).spinner("option", "max", 10);
                $(this).spinner("value", $.cookie($(this).attr("id")));
            } else {
                $(this).spinner("option", "max", 12);
                $(this).spinner("value", $.cookie($(this).attr("id")));
            }
        },
        stop: function () {
            if ($(this).spinner("value") > 10) {
                $(this).css("background-color", "#FF9494");
            } else {
                $(this).css("background-color", "#FFFFFF");
                showGrade(generateFinalGrade());
                $.cookie($(this).attr("id"), $(this).spinner("value"), {expires: 365});
            }
        }
    });

    // Participation Spinner
    $("#lab_participation").spinner({
        min: 0,
        max: 100,
        step: 0.01,
        numberFormat: "n",
        create: function () {
            $("#lab_participation").spinner("value", $.cookie('lab_participation'));
        },
        stop: function () {
            if ($(this).spinner("value") > 100) {
                $(this).css("background-color", "#FF9494");
            } else {
                $(this).css("background-color", "#FFFFFF");
                showGrade(generateFinalGrade());
                $.cookie($(this).attr("id"), $(this).spinner("value"), {expires: 365});
            }
        }
    });

    // Attendance Spinners
    $("input[name*='_attendance']").spinner({
        min: 0,
        step: 1,
        create: function () {
            $(this).spinner("value", $.cookie($(this).attr("id")));
        },
        stop: function () {
            $(this).spinner();
            showGrade(generateFinalGrade());
            $.cookie($(this).attr("id"), $(this).spinner("value"), {expires: 365});
        }
    });
}

/**
 * Builds and binds all the information tooltips for the individual fieldsets
 */
function buildInfoTooltips() {
    // Lecture Legend Tooltips
    $("#lec_exams_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lecture Exams:</strong> Enter exam grade percentages as numbers (e.g. 85% should be entered as 85)</p><p>Exam grade is calculated by taking the sum of all exams and dividing that total by the amount of exams.</p><p><strong>NOTE:</strong> If Exam 2 grade is larger than the Exam 1 grade, then the calculation will take the difference of Exam 2 - Exam 1, divide that by 2 and add that to the Exam 1 grade.</p><p>e.g. Exam 1 = ((Exam 2 - Exam 1) / 2) + Exam 1</p>"
    });
    $("#lec_final_exam_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lecture Final Exams:</strong> Enter final exam grade percentage as a number (e.g. 85% should be entered as 85)</p>"
    });
    $("#lec_quizzes_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lecture Quizzes:</strong> Enter quiz grades. Quiz grade average is calculated as follows...</p><p>Quiz Avg = Sum of all quizzes / Total possible points</p><p><strong>NOTE:</strong> The lowest grade is not used while calculating the final quiz grade average.</p>"
    });
    $("#lec_attendance_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lecture Attendance:</strong> Enter attendance as number of days missed.</p><p><strong>NOTE:</strong> <br>0-3 Days Missed: 0pts<br>4-7 Days Missed: 2pts/day<br>7+ Days Missed: &nbsp;Automatic Failure</p>"
    });

    // Lab Legend Tooltips
    $("#lab_exams_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lab Practicals:</strong> Enter practical grade percentages as numbers (e.g. 85% should be entered as 85)</p><p><strong>NOTE:</strong> Each exam is worth 20% of the total. <br><br>e.g. Total = (Practical 1 + Practical 2 + Practical 3) / 3</p>"
    });
    $("#lab_final_exam_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lab Final Exams:</strong> Enter final exam grade percentage as a number (e.g. 85% should be entered as 85)</p>"
    });
    $("#lab_participation_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lab Participation:</strong> Enter participation grade percentage as a number (e.g. 85% should be entered as 85)</p>"
    });
    $("#lab_attendance_wrapper").find("legend img.info_icon").tooltip({
        tooltipClass: "info_tooltip",
        content: "<p><strong>Lab Attendance:</strong>> Enter attendance as number of days missed.</p><p><strong>NOTE:</strong> For each day missed, the final lab grade is reduced by 2%</p><p>e.g. 2 days missed results in a 4% reduction</p>"
    });

    // Grade Information
    $("#info_output").find("h3 img.info_icon").tooltip({
        tooltipClass: "info_tooltip info_tooltip_grade_final",
        content: "<p><strong>Grade Information:</strong> The final grade total is calculated as follows...</p><p><strong>Lecture:</strong><br>((((Exam1 + Exam2 + Exam3 + Exam4) / 4) * 0.7) + (((Quiz Total / Total Possible) * 100) * 0.1) + (FinalExam * 0.2)) * 0.75</p><p><strong>+</strong></p><p><strong>Lab:</strong><br>(((((Practical1 + Practical2 + Practical3) / 3) * 0.6) + (Final Practical * 0.3) + (Participation * 0.1)) * 0.25) * (Days Missed * 0.02)</p>"
    });
}

/**
 * Builds all the user cookies
 */
function buildUserCookies() {
    // TODO: Need to simplify these
    // Lecture Exams
    if (typeof $.cookie('lec_exam_1') === 'undefined') {
        $.cookie('lec_exam_1', 100, {expires: 365});
    }
    if (typeof $.cookie('lec_exam_2') === 'undefined') {
        $.cookie('lec_exam_2', 100, {expires: 365});
    }
    if (typeof $.cookie('lec_exam_3') === 'undefined') {
        $.cookie('lec_exam_3', 100, {expires: 365});
    }
    if (typeof $.cookie('lec_exam_4') === 'undefined') {
        $.cookie('lec_exam_4', 100, {expires: 365});
    }

    // Lecture Final Exam
    if (typeof $.cookie('lec_final_exam') === 'undefined') {
        $.cookie('lec_final_exam', 100, {expires: 365});
    }

    // Lecture Quizzes
    if (typeof $.cookie('lec_quiz_1') === 'undefined') {
        $.cookie('lec_quiz_1', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_2') === 'undefined') {
        $.cookie('lec_quiz_2', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_3') === 'undefined') {
        $.cookie('lec_quiz_3', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_4') === 'undefined') {
        $.cookie('lec_quiz_4', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_5') === 'undefined') {
        $.cookie('lec_quiz_5', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_6') === 'undefined') {
        $.cookie('lec_quiz_6', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_7') === 'undefined') {
        $.cookie('lec_quiz_7', 12, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_8') === 'undefined') {
        $.cookie('lec_quiz_8', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_9') === 'undefined') {
        $.cookie('lec_quiz_9', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_10') === 'undefined') {
        $.cookie('lec_quiz_10', 10, {expires: 365});
    }
    if (typeof $.cookie('lec_quiz_11') === 'undefined') {
        $.cookie('lec_quiz_11', 10, {expires: 365});
    }

    // Lecture Attendance
    if (typeof $.cookie('lec_attendance') === 'undefined') {
        $.cookie('lec_attendance', 0, {expires: 365});
    }

    // Lab Exams
    if (typeof $.cookie('lab_exam_1') === 'undefined') {
        $.cookie('lab_exam_1', 100, {expires: 365});
    }
    if (typeof $.cookie('lab_exam_2') === 'undefined') {
        $.cookie('lab_exam_2', 100, {expires: 365});
    }
    if (typeof $.cookie('lab_exam_3') === 'undefined') {
        $.cookie('lab_exam_3', 100, {expires: 365});
    }

    // Lab Final Exam
    if (typeof $.cookie('lab_final_exam') === 'undefined') {
        $.cookie('lab_final_exam', 100, {expires: 365});
    }

    // Lab Participation
    if (typeof $.cookie('lab_participation') === 'undefined') {
        $.cookie('lab_participation', 100, {expires: 365});
    }

    // Lab Attendance
    if (typeof $.cookie('lab_attendance') === 'undefined') {
        $.cookie('lab_attendance', 0, {expires: 365});
    }
}

/**
 * Displays the final grade and final letter grade
 *
 * @param finalGrade The final grade in number format
 */
function showGrade(finalGrade) {
    $("#total_num_grade").html(finalGrade);
    $("#total_letter_grade").html(convertToLetterGrade(finalGrade));

    // Highlight the grade scale
    highlightGradeScale(convertToLetterGrade(finalGrade));
}

/**
 * Highlights the appropriate grade scale which matches the letter grade using a color scale
 *
 * @param letterGrade
 */
function highlightGradeScale(letterGrade) {
    // Reset the styles
    $("dd").css({"background-color": "#FFF", "font-weight": "normal"});

    var _match = "";
    var _color = "";

    // TODO Can this be improved?
    // Set the new style
    switch (letterGrade) {
        case "A":
            _match = "89.50 - 100.0 = A";
            _color = "#12D600"; // Bright Green
            break;
        case "B+":
            _match = "88.50 - 89.49 = B+";
            _color = "#68C91E"; // Green
            break;
        case "B":
            _match = "79.50 - 88.49 = B";
            _color = "#71C91E"; // Light Green
            break;
        case "C+":
            _match = "78.50 - 79.49 = C+";
            _color = "#9EC91E"; // Green Yellow
            break;
        case "C":
            _match = "69.50 - 78.49 = C";
            _color = "#D3DB44"; // Yellow
            break;
        case "D+":
            _match = "68.50 - 69.49 = D+";
            _color = "#DBC044"; // Dark Yellow
            break;
        case "D":
            _match = "59.50 - 68.49 = D";
            _color = "#DB9044"; // Reddish Orange
            break;
        default:
            _match = "00.00 - 59.50 = F";
            _color = "#DB4444"; // Red
            break;
    }

    $("dd").filter(function () {
        return $(this).text() === _match;
    }).css({"background-color": _color, "font-weight": "bold"});
}

/**
 * Returns the lecture exams grades as an array from the input elements on the page
 *
 * @returns {Array}
 */
function getLectureExamGrades() {
    // Get the lecture exam values
    var _lecExamsArr = $("input[name*='lec_exam']");
    var _lecExamVals = [];

    $.each(_lecExamsArr, function (i, items) {
        _lecExamVals[i] = parseFloat($(items).val());
    });

    return _lecExamVals;
}

/**
 * Returns the lab exam grades (practicals) from the input elements on the page
 *
 * @returns {Array}
 */
function getLabExamGrades() {
    // Get lab exams
    var _labExamsArr = $("input[name*='lab_exam']");
    var _labExamVals = [];

    $.each(_labExamsArr, function (k, items) {
        _labExamVals[k] = parseFloat($(items).val());
    });

    return _labExamVals;
}

/**
 * Returns the lecture quiz grades from the input elements on the page and creates an array in parallel with
 * the base quiz values.
 *
 * @returns {Array}
 */
function getLectureQuizGrades() {
    // Get the lecture quiz values
    var _lecQuizArr = $("input[name*='lec_quiz']");
    var _lecQuizVals = [];

    $.each(_lecQuizArr, function (j, items) {
        _lecQuizVals[j] = parseFloat($(items).val());
    });

    // TODO Create a way so that the base values can be manually entered from the form
    // Quiz base values
    var _lecQuizBaseVals = [10, 10, 10, 10, 10, 10, 12, 10, 10, 10, 10];

    return [_lecQuizBaseVals, _lecQuizVals];
}


/**
 * Calculates the final overall grade of both lecture and lab and returns the result as a percentage.
 *
 * Overall grade is determined by both lecture and lab
 *   lecture = 75%
 *   lab = 25%
 *
 * Calculation for final overall grade -
 *   (((Test1% + Test2% + Test3% + Test4%) / 4) * 0.7 + ((Quiz Total / Total Possible) * 100) * 0.1 + (Exam%) * 0.2) * 0.75
 *   +
 *   (((Practical1 + Practical2 + Practical3) / 3) * 0.6) + (Final Practical% * 0.3) + ((Participation) * 0.1)) * 0.25
 *
 * @returns {number} The final grade as a percentage
 */
function generateFinalGrade() {
    var _lec = new Lecture();
    var _lab = new Lab();

    // Get the lecture final exam value
    var _lecFinalExamVal = parseFloat($("input[name='lec_final_exam']").val());

    // Get the lecture attendance
    var _lecAttendanceVal = parseInt($("input[name='lec_attendance']").val());

    /* LAB */
    // Get lab final exam
    var _labFinalExamVal = parseFloat($("input[name='lab_final_exam']").val());

    // Get lab participation
    var _labParticipationVal = parseFloat($("input[name='lab_participation']").val());

    // Get lab attendance
    var _labAttendanceVal = parseFloat($("input[name='lab_attendance']").val());

    var _lecTotal = _lec.calculateWeightedTotal(getLectureExamGrades(), getLectureQuizGrades(), _lecFinalExamVal,
        _lecAttendanceVal);

    var _labTotal = _lab.calculateWeightedTotal(getLabExamGrades(), _labFinalExamVal, _labParticipationVal,
        _labAttendanceVal);

    if (_lecTotal === -1) {
        return 0;
    }

    return (_lecTotal + _labTotal).toFixed(8);
}

/**
 * Returns the letter grade equivalent of a numerical grade
 *
 * Grading Scale -
 *   89.50 - 100.0 = A
 *   88.50 - 89.49 = B+
 *   79.50 - 88.49 = B
 *   78.50 - 79.49 = C+
 *   69.50 - 78.49 = C
 *   68.50 - 69.49 = D+
 *   59.50 - 68.49 = D
 *   00.00 - 59.50 = F
 *
 * @param {number} numGrade Numerical grade percentage
 * @returns {string} Letter equivalent of a numerical grade
 */
function convertToLetterGrade(numGrade) {

    if (numGrade >= 89.5) {
        return "A";
    }
    else {
        if (numGrade >= 88.5 && numGrade < 89.5) {
            return "B+";
        }
        else {
            if (numGrade >= 79.5 && numGrade < 88.5) {
                return "B";
            }
            else {
                if (numGrade >= 78.5 && numGrade < 79.5) {
                    return "C+";
                }
                else {
                    if (numGrade >= 69.5 && numGrade < 78.5) {
                        return "C";
                    }
                    else {
                        if (numGrade >= 68.5 && numGrade < 69.5) {
                            return "D+";
                        }
                        else {
                            if (numGrade >= 59.5 && numGrade < 68.5) {
                                return "D";
                            }
                            else {
                                return "F";
                            }
                        }
                    }
                }
            }
        }
    }
}