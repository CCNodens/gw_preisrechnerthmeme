<?php
namespace Vancado\GwPreisrechnertheme\Tests\Unit\Controller;

/**
 * Test case.
 */
class ThemeControllerTest extends \TYPO3\CMS\Core\Tests\UnitTestCase
{
    /**
     * @var \Vancado\GwPreisrechnertheme\Controller\ThemeController
     */
    protected $subject = null;

    protected function setUp()
    {
        parent::setUp();
        $this->subject = $this->getMockBuilder(\Vancado\GwPreisrechnertheme\Controller\ThemeController::class)
            ->setMethods(['redirect', 'forward', 'addFlashMessage'])
            ->disableOriginalConstructor()
            ->getMock();
    }

    protected function tearDown()
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function listActionFetchesAllThemesFromRepositoryAndAssignsThemToView()
    {

        $allThemes = $this->getMockBuilder(\TYPO3\CMS\Extbase\Persistence\ObjectStorage::class)
            ->disableOriginalConstructor()
            ->getMock();

        $themeRepository = $this->getMockBuilder(\::class)
            ->setMethods(['findAll'])
            ->disableOriginalConstructor()
            ->getMock();
        $themeRepository->expects(self::once())->method('findAll')->will(self::returnValue($allThemes));
        $this->inject($this->subject, 'themeRepository', $themeRepository);

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $view->expects(self::once())->method('assign')->with('themes', $allThemes);
        $this->inject($this->subject, 'view', $view);

        $this->subject->listAction();
    }

    /**
     * @test
     */
    public function editActionAssignsTheGivenThemeToView()
    {
        $theme = new \Vancado\GwPreisrechnertheme\Domain\Model\Theme();

        $view = $this->getMockBuilder(\TYPO3\CMS\Extbase\Mvc\View\ViewInterface::class)->getMock();
        $this->inject($this->subject, 'view', $view);
        $view->expects(self::once())->method('assign')->with('theme', $theme);

        $this->subject->editAction($theme);
    }

    /**
     * @test
     */
    public function updateActionUpdatesTheGivenThemeInThemeRepository()
    {
        $theme = new \Vancado\GwPreisrechnertheme\Domain\Model\Theme();

        $themeRepository = $this->getMockBuilder(\::class)
            ->setMethods(['update'])
            ->disableOriginalConstructor()
            ->getMock();

        $themeRepository->expects(self::once())->method('update')->with($theme);
        $this->inject($this->subject, 'themeRepository', $themeRepository);

        $this->subject->updateAction($theme);
    }
}
